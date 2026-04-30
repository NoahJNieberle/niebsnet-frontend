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
export class ProjectsArchiveComponent {
  projects = projects;
}

