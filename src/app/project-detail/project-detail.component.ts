import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { projects, Project } from '../data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  slug: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || '';
      this.project = projects.find(p => p.slug === this.slug);
      
      if (!this.project) {
        this.router.navigate(['/projects']);
      }
    });
  }

  getStatusLabel(status?: string): string {
    switch (status) {
      case 'live': return 'Live';
      case 'wip': return 'In Progress';
      case 'archived': return 'Archived';
      default: return '';
    }
  }
}

