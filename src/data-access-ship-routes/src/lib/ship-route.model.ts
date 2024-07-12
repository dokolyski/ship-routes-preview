import { RawShipRoute } from './ship-route.raw-model';

export interface ShipRoute {
  fromPort: string;
  durationInMs: string;
  points: ShipRoutePoint[];
  routeId: string;
  toPort: string;
}

interface ShipRoutePoint {
  longitude: number;
  latitude: number;
  timestamp: number;
  knotsSpeed: number;
}

export function parseShipRoute(rawObject: RawShipRoute): ShipRoute {
  return {
    fromPort: rawObject.from_port,
    durationInMs: rawObject.leg_duration,
    points: (
      JSON.parse(rawObject.points) as [number, number, number, number][]
    ).map(([longitude, latitude, timestamp, knotsSpeed]) => ({
      longitude,
      latitude,
      timestamp,
      knotsSpeed,
    })),
    routeId: rawObject.route_id,
    toPort: rawObject.to_port,
  };
}
