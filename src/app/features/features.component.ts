import { Component } from '@angular/core';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
/** Standalone feature-card route kept separate from the main portfolio flow. */
export class FeaturesComponent {
  /** Static feature cards for the standalone features route. */
  readonly features: FeatureItem[] = [
    {
      title: 'Feature One',
      description: 'This is the first feature description. It showcases what this feature can do.',
      icon: '🚀'
    },
    {
      title: 'Feature Two',
      description: 'This is the second feature description. It highlights another capability.',
      icon: '✨'
    },
    {
      title: 'Feature Three',
      description: 'This is the third feature description. It demonstrates additional functionality.',
      icon: '🎯'
    }
  ];
}

