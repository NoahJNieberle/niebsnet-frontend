import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  features = [
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

