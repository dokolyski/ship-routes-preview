import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ShipRoute } from '@marcura-test/data-access-ship-routes';
import * as L from 'leaflet';

@Component({
  selector: 'ui-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-map.component.html',
  styleUrl: './ui-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMapComponent implements OnInit {
  private map!: L.Map;
  private currentPolyline?: L.Polyline;
  @Input() set shipRoute(shipRoute: ShipRoute | null) {
    if (shipRoute) {
      this._showShipRoute(shipRoute);
    } else {
      this.currentPolyline?.remove();
    }
  }

  ngOnInit(): void {
    this._initMap();
  }

  private _initMap(): void {
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 2,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  private _showShipRoute(shipRoute: ShipRoute): void {
    const newPolyline = L.polyline(
      shipRoute.points.map((point) => [point.latitude, point.longitude]),
      {
        color: 'red',
        className: 'ship-route-polyline',
      }
    );

    this.currentPolyline?.remove();
    newPolyline.addTo(this.map);
    this.currentPolyline = newPolyline;
  }
}
