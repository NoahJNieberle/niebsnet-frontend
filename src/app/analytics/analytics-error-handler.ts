import { ErrorHandler, inject, Injectable } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Injectable()
export class AnalyticsErrorHandler implements ErrorHandler {
  private readonly analytics = inject(AnalyticsService);

  handleError(error: unknown): void {
    this.analytics.captureException(error, {
      source: 'angular_error_handler'
    });

    console.error(error);
  }
}
