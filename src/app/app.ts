import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AnalyticsService } from './analytics/analytics.service';
import { scrollElementIntoView } from './shared/scrolling';

interface NavItem {
  label: string;
  sectionId: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
/** Application shell that owns global navigation, layout, and routed page outlet. */
export class App {
  readonly navItems: NavItem[] = [
    { label: 'About', sectionId: 'about' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  isMobileNavOpen = false;

  private readonly analytics = inject(AnalyticsService);
  private readonly documentRef = inject(DOCUMENT);

  constructor(private readonly router: Router) {
    void this.analytics.initialize();
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    this.isMobileNavOpen = false;
    this.analytics.captureNavigationClick(sectionId);
    
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollElementIntoView(sectionId), 100);
      });
    } else {
      this.scrollElementIntoView(sectionId);
    }
  }

  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  private scrollElementIntoView(sectionId: string): void {
    scrollElementIntoView(this.documentRef, sectionId);
  }
}
