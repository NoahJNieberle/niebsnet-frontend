import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import type posthog from 'posthog-js';
import { filter } from 'rxjs';
import { posthogAnalyticsConfig } from './posthog.config';

type AnalyticsPropertyValue = string | number | boolean | null | undefined;
type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;
type PostHogClient = typeof posthog;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly documentRef = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  private initialized = false;
  private routeTrackingStarted = false;
  private posthogClient: PostHogClient | null = null;

  async initialize(): Promise<void> {
    if (this.initialized || !this.shouldCapture()) {
      return;
    }

    try {
      const { default: posthogClient } = await import('posthog-js');

      posthogClient.init(posthogAnalyticsConfig.projectToken, {
        api_host: posthogAnalyticsConfig.apiHost,
        defaults: '2026-01-30',
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: true,
        rageclick: true,
        capture_exceptions: true,
        mask_personal_data_properties: true,
        mask_all_element_attributes: false,
        mask_all_text: false,
        session_recording: {
          maskAllInputs: true,
          sampleRate: posthogAnalyticsConfig.sessionReplaySampleRate
        }
      });

      this.posthogClient = posthogClient;
      this.initialized = true;
      this.startRouteTracking();
    } catch (error) {
      console.warn('PostHog analytics failed to initialize.', error);
    }
  }

  capture(eventName: string, properties: AnalyticsProperties = {}): void {
    if (!this.initialized) {
      return;
    }

    this.posthogClient?.capture(eventName, this.cleanProperties(properties));
  }

  captureException(error: unknown, properties: AnalyticsProperties = {}): void {
    if (!this.initialized) {
      return;
    }

    this.posthogClient?.captureException(error, this.cleanProperties(properties));
  }

  captureNavigationClick(sectionId: string): void {
    this.capture('navigation_click', {
      section_id: sectionId
    });
  }

  captureProjectClick(slug: string, title: string, source: string): void {
    this.capture('project_click', {
      project_slug: slug,
      project_title: title,
      source
    });
  }

  captureContactClick(email: string): void {
    this.capture('contact_click', {
      contact_type: 'email',
      email_domain: email.split('@')[1] ?? null
    });
  }

  captureOutboundLinkClick(label: string, href: string): void {
    this.capture('outbound_link_click', {
      link_label: label,
      link_host: this.getLinkHost(href)
    });
  }

  captureReportDownload(projectSlug: string, reportTitle: string): void {
    this.capture('report_download', {
      project_slug: projectSlug,
      report_title: reportTitle
    });
  }

  captureProjectDetailView(slug: string, title: string): void {
    this.capture('project_detail_view', {
      project_slug: slug,
      project_title: title
    });
  }

  private startRouteTracking(): void {
    if (this.routeTrackingStarted) {
      return;
    }

    this.routeTrackingStarted = true;
    this.capturePageView(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.capturePageView(event.urlAfterRedirects));
  }

  private capturePageView(path: string): void {
    this.capture('$pageview', {
      path,
      title: this.documentRef.title,
      url: this.getAbsoluteUrl(path)
    });
  }

  private shouldCapture(): boolean {
    if (!isPlatformBrowser(this.platformId) || !posthogAnalyticsConfig.enabled) {
      return false;
    }

    return posthogAnalyticsConfig.captureOnLocalhost || !this.isLocalhost();
  }

  private isLocalhost(): boolean {
    const hostname = this.documentRef.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1';
  }

  private getAbsoluteUrl(path: string): string {
    return new URL(path, this.documentRef.location.origin).toString();
  }

  private getLinkHost(href: string): string | null {
    try {
      return new URL(href, this.documentRef.location.origin).host;
    } catch {
      return null;
    }
  }

  private cleanProperties(properties: AnalyticsProperties): AnalyticsProperties {
    return Object.fromEntries(
      Object.entries(properties).filter(([, value]) => value !== undefined)
    ) as AnalyticsProperties;
  }
}
