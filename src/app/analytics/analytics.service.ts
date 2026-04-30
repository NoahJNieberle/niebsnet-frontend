import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import type posthog from 'posthog-js';
import { filter } from 'rxjs';
import { posthogAnalyticsConfig } from './posthog.config';

type AnalyticsPropertyValue = string | number | boolean | null | undefined;
type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;
type PostHogClient = typeof posthog;

export interface SectionViewTarget {
  sectionId: string;
  sectionName: string;
  properties?: AnalyticsProperties;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly documentRef = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  private initialized = false;
  private unavailable = false;
  private routeTrackingStarted = false;
  private engagementTrackingStarted = false;
  private readonly eventQueue: { eventName: string; properties: AnalyticsProperties }[] = [];
  private readonly viewedSections = new Set<string>();
  private readonly scrollDepthsTracked = new Set<number>();
  private posthogClient: PostHogClient | null = null;

  async initialize(): Promise<void> {
    if (this.initialized || this.unavailable || !this.shouldCapture()) {
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
      this.startScrollDepthTracking();
      this.flushQueuedEvents();
    } catch (error) {
      this.unavailable = true;
      this.eventQueue.length = 0;
      console.warn('PostHog analytics failed to initialize.', error);
    }
  }

  capture(eventName: string, properties: AnalyticsProperties = {}): void {
    const cleanedProperties = this.cleanProperties(properties);

    if (this.unavailable) {
      return;
    }

    if (!this.initialized) {
      if (this.shouldCapture()) {
        this.eventQueue.push({ eventName, properties: cleanedProperties });
      }
      return;
    }

    this.posthogClient?.capture(eventName, cleanedProperties);
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

  captureLogoClick(): void {
    this.capture('logo_click', {
      destination: 'home'
    });
  }

  captureMobileNavToggle(isOpen: boolean): void {
    this.capture('mobile_navigation_toggle', {
      state: isOpen ? 'opened' : 'closed'
    });
  }

  captureProjectArchiveClick(source: string): void {
    this.capture('project_archive_click', {
      source
    });
  }

  captureProjectArchiveView(projectCount: number): void {
    this.capture('project_archive_view', {
      project_count: projectCount
    });
  }

  captureProjectClick(slug: string, title: string, source: string, interaction: string): void {
    this.capture('project_click', {
      project_slug: slug,
      project_title: title,
      source,
      interaction
    });
  }

  captureBackNavigation(source: string, destination: string): void {
    this.capture('back_navigation_click', {
      source,
      destination
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

  captureProjectNotFound(slug: string): void {
    this.capture('project_not_found', {
      requested_slug: slug
    });
  }

  trackSectionViews(sections: SectionViewTarget[], sharedProperties: AnalyticsProperties = {}): void {
    const viewport = this.documentRef.defaultView;

    if (!viewport || !('IntersectionObserver' in viewport) || !this.shouldCapture()) {
      return;
    }

    const observer = new viewport.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.35) {
            continue;
          }

          const section = sections.find((target) => target.sectionId === entry.target.id);
          if (!section) {
            continue;
          }

          const viewKey = `${this.router.url}:${section.sectionId}`;
          if (this.viewedSections.has(viewKey)) {
            observer.unobserve(entry.target);
            continue;
          }

          this.viewedSections.add(viewKey);
          this.capture('section_view', {
            section_id: section.sectionId,
            section_name: section.sectionName,
            path: this.router.url,
            ...sharedProperties,
            ...section.properties
          });
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: [0.35]
      }
    );

    for (const section of sections) {
      const element = this.documentRef.getElementById(section.sectionId);
      if (element) {
        observer.observe(element);
      }
    }
  }

  private startRouteTracking(): void {
    if (this.routeTrackingStarted) {
      return;
    }

    this.routeTrackingStarted = true;
    this.capturePageView(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.scrollDepthsTracked.clear();
        this.capturePageView(event.urlAfterRedirects);
      });
  }

  private capturePageView(path: string): void {
    this.capture('$pageview', {
      path,
      page_type: this.getPageType(path),
      title: this.documentRef.title,
      url: this.getAbsoluteUrl(path)
    });
  }

  private startScrollDepthTracking(): void {
    const viewport = this.documentRef.defaultView;

    if (this.engagementTrackingStarted || !viewport) {
      return;
    }

    this.engagementTrackingStarted = true;

    viewport.addEventListener('scroll', () => this.captureScrollDepth(), {
      passive: true
    });
    this.captureScrollDepth();
  }

  private captureScrollDepth(): void {
    const viewport = this.documentRef.defaultView;
    const documentElement = this.documentRef.documentElement;

    if (!viewport || !documentElement) {
      return;
    }

    const scrollableHeight = documentElement.scrollHeight - viewport.innerHeight;
    const scrollTop = viewport.scrollY || documentElement.scrollTop;
    const depth =
      scrollableHeight <= 0
        ? 100
        : ((scrollTop + viewport.innerHeight) / documentElement.scrollHeight) * 100;

    for (const threshold of [25, 50, 75, 100]) {
      if (depth >= threshold && !this.scrollDepthsTracked.has(threshold)) {
        this.scrollDepthsTracked.add(threshold);
        this.capture('scroll_depth', {
          depth_percent: threshold,
          path: this.router.url,
          page_type: this.getPageType(this.router.url)
        });
      }
    }
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

  private getPageType(path: string): string {
    if (path === '/' || path.startsWith('/#')) {
      return 'home';
    }

    if (path === '/projects') {
      return 'project_archive';
    }

    if (path.startsWith('/projects/')) {
      return 'project_detail';
    }

    return 'other';
  }

  private flushQueuedEvents(): void {
    for (const event of this.eventQueue.splice(0)) {
      this.posthogClient?.capture(event.eventName, event.properties);
    }
  }

  private cleanProperties(properties: AnalyticsProperties): AnalyticsProperties {
    return Object.fromEntries(
      Object.entries(properties).filter(([, value]) => value !== undefined)
    ) as AnalyticsProperties;
  }
}
