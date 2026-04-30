import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCardComponent } from '../components/project-card/project-card.component';
import { projects } from '../data/projects.data';
import { AnalyticsService } from '../analytics/analytics.service';

@Component({
  selector: 'app-projects-archive',
  standalone: true,
  imports: [ProjectCardComponent, RouterLink],
  templateUrl: './projects-archive.component.html',
  styleUrl: './projects-archive.component.css'
})
/** Archive route that lists every portfolio project with the shared card component. */
export class ProjectsArchiveComponent implements OnInit {
  /** Full project collection displayed without homepage-specific section framing. */
  protected readonly projects = projects;

  private readonly analytics = inject(AnalyticsService);

  ngOnInit(): void {
    this.analytics.captureProjectArchiveView(this.projects.length);
  }

  trackBackClick(): void {
    this.analytics.captureBackNavigation('project_archive', 'home');
  }
}

