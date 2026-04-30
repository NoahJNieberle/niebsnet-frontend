import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { orderedProjects } from '../../data/projects.data';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [ProjectCardComponent, RouterLink],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
/** Homepage projects section that wraps shared project cards with section chrome. */
export class ProjectsSectionComponent {
  /** Homepage project list, pre-ordered so highlighted projects appear first. */
  protected readonly projects = orderedProjects;
}

