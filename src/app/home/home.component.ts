import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
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
export class HomeComponent implements AfterViewInit {
  /** Static portfolio content rendered by the homepage sections. */
  readonly data = homeData;

  private readonly analytics = inject(AnalyticsService);
  private readonly documentRef = inject(DOCUMENT);

  ngAfterViewInit(): void {
    this.analytics.trackSectionViews([
      { sectionId: 'about', sectionName: 'About' },
      { sectionId: 'experience', sectionName: 'Experience' },
      { sectionId: 'projects', sectionName: 'Featured Projects' },
      { sectionId: 'contact', sectionName: 'Contact' }
    ]);
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    scrollElementIntoView(this.documentRef, sectionId);
  }

  trackContactClick(): void {
    this.analytics.captureContactClick(this.data.contact.email);
  }
}
