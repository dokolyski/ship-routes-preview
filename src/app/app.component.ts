import { Component } from '@angular/core';
import { FeatureMapComponent } from '@ship-routes-preview/feature-map';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FeatureMapComponent],
})
export class AppComponent {}
