import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  getProjectBySlug,
  getProjectStatusClass,
  getProjectStatusLabel,
  Project
} from '../data/projects.data';
import { AnalyticsService } from '../analytics/analytics.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
/** Project detail route that resolves the selected project by URL slug. */
export class ProjectDetailComponent implements OnInit {
  /** Detail view resolved from the route slug; missing slugs return to the archive. */
  project: Project | undefined;

  private readonly analytics = inject(AnalyticsService);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef
  ) {}

  protected readonly getProjectStatusClass = getProjectStatusClass;
  protected readonly getProjectStatusLabel = getProjectStatusLabel;

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get('slug') ?? '';
      this.project = getProjectBySlug(slug);
      
      if (!this.project) {
        void this.router.navigate(['/projects']);
        return;
      }

      this.analytics.captureProjectDetailView(this.project.slug, this.project.title);
    });
  }

  trackOutboundLinkClick(label: string, href: string): void {
    this.analytics.captureOutboundLinkClick(label, href);
  }

  trackReportDownload(reportTitle: string): void {
    if (!this.project) {
      return;
    }

    this.analytics.captureReportDownload(this.project.slug, reportTitle);
  }
}

