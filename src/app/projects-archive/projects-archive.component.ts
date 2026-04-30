import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCardComponent } from '../components/project-card/project-card.component';
import { projects } from '../data/projects.data';

@Component({
  selector: 'app-projects-archive',
  standalone: true,
  imports: [ProjectCardComponent, RouterLink],
  templateUrl: './projects-archive.component.html',
  styleUrl: './projects-archive.component.css'
})
/** Archive route that lists every portfolio project with the shared card component. */
export class ProjectsArchiveComponent {
  /** Full project collection displayed without homepage-specific section framing. */
  protected readonly projects = projects;
}

