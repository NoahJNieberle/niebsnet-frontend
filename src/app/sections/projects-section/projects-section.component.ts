import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { projects } from '../../data/projects.data';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [ProjectCardComponent, RouterLink],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent {
  projects = projects;
  
  get sortedProjects() {
    return [...this.projects].sort((a, b) => {
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      return 0;
    });
  }
}

