import { Component, inject, Input } from '@angular/core';
import {
  getProjectStatusClass,
  getProjectStatusLabel,
  Project
} from '../../data/projects.data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../analytics/analytics.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
/** Reusable project summary card used by both the home page and archive page. */
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;

  protected readonly getProjectStatusClass = getProjectStatusClass;
  protected readonly getProjectStatusLabel = getProjectStatusLabel;

  private readonly analytics = inject(AnalyticsService);

  trackProjectClick(source: string): void {
    this.analytics.captureProjectClick(this.project.slug, this.project.title, source);
  }
}

