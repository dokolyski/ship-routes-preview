import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-route-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-route-selection.component.html',
  styleUrl: './ui-route-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRouteSelectionComponent {}
