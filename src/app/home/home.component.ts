import { Component } from '@angular/core';
import { ProjectsSectionComponent } from '../sections/projects-section/projects-section.component';
import { CommonModule } from '@angular/common';
import { homeData } from '../data/home.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProjectsSectionComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data = homeData;

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
