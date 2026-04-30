import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProjectsSectionComponent } from '../sections/projects-section/projects-section.component';
import { homeData } from '../data/home.data';
import { scrollElementIntoView } from '../shared/scrolling';
import { AnalyticsService } from '../analytics/analytics.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProjectsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
/** Homepage composition for about, experience, featured projects, and contact sections. */
export class HomeComponent {
  /** Static portfolio content rendered by the homepage sections. */
  readonly data = homeData;

  private readonly analytics = inject(AnalyticsService);
  private readonly documentRef = inject(DOCUMENT);

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    scrollElementIntoView(this.documentRef, sectionId);
  }

  trackContactClick(): void {
    this.analytics.captureContactClick(this.data.contact.email);
  }
}
