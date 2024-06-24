import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as Papa from 'papaparse';
import { Observable } from 'rxjs';
import { ShipRoute, parseShipRoute } from './ship-route.model';
import { RawShipRoute } from './ship-route.raw-model';

@Injectable({
  providedIn: 'root',
})
export class ShipRoutesApiService {
  private readonly _http = inject(HttpClient);

  getShipRoutesFromCSV() {
    return new Observable<ShipRoute[]>((observer) => {
      this._http
        .get('web_challenge.csv', { responseType: 'text' })
        .subscribe((data) => {
          Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,

            complete: (result: { data: RawShipRoute[] }) => {
              observer.next(result.data.map(parseShipRoute));
              observer.complete();
            },
          });
        });
    });
  }
}
