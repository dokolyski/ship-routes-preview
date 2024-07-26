import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatOption, MatSelect } from '@angular/material/select';
import { DurationPipe } from './duration-pipe/duration.pipe';

@Component({
  selector: 'ship-routes-ui-route-selection',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCard,
    MatSelect,
    MatOption,
    DurationPipe,
    DurationPipe,
  ],
  templateUrl: './ui-route-selection.component.html',
  styleUrl: './ui-route-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRouteSelectionComponent {
  readonly allRoutes = input.required<
    {
      from: string;
      to: string;
      id: string;
      durationInMs: number;
      routeStartDate: number;
    }[]
  >();
  readonly routeSelected = output<string | null>();
  readonly routeHighlighted = output<string | null>();
}
