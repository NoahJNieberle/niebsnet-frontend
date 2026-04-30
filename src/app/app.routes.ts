import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsArchiveComponent } from './projects-archive/projects-archive.component';
import { FeaturesComponent } from './features/features.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Portfolio - Home'
  },
  {
    path: 'projects',
    component: ProjectsArchiveComponent,
    title: 'Portfolio - Projects'
  },
  {
    path: 'projects/:slug',
    component: ProjectDetailComponent,
    title: 'Project Details'
  },
  {
    path: 'features',
    component: FeaturesComponent,
    title: 'Features'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
