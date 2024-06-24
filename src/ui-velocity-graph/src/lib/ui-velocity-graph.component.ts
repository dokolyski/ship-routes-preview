import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui-velocity-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-velocity-graph.component.html',
  styleUrl: './ui-velocity-graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiVelocityGraphComponent {}
