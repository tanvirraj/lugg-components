import { useState, useEffect, useCallback } from 'react';
import { theme } from '@/shared/tailwind';
import { DirectionsRenderer } from '@react-google-maps/api';
import { useMap } from '../Map';
import { Position } from 'geojson';

export interface RouteLineProps {
  origin?: Position;
  destination?: Position;
  strokeWeight: number;
  strokeColor: string;
}

const RouteLine = ({
  origin,
  destination,
  strokeColor,
  strokeWeight,
}: RouteLineProps) => {
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>(undefined);
  const googleMap = useMap();

  const calculateRoute = useCallback(
    async (o: number[], d: number[]) => {
      const DirectionsService = new googleMap.maps.DirectionsService();

      return await DirectionsService.route({
        origin: new google.maps.LatLng(o[0], o[1]),
        destination: new google.maps.LatLng(d[0], d[1]),
        travelMode: google.maps.TravelMode.DRIVING,
      });
    },
    [googleMap]
  );

  useEffect(() => {
    (async () => {
      if (origin && destination) {
        const response = await calculateRoute(origin, destination);
        setDirectionsResponse(response);
      }
    })();
  }, [origin, destination, calculateRoute]);

  return directionsResponse ? (
    <DirectionsRenderer
      directions={directionsResponse}
      options={{
        markerOptions: { visible: false },
        polylineOptions: {
          strokeColor,
          strokeWeight,
        },
      }}
    />
  ) : null;
};

const defaultProps: RouteLineProps = {
  strokeWeight: 5,
  strokeColor: theme.colors.brand['DEFAULT'],
};

RouteLine.defaultProps = defaultProps;

export { RouteLine };
