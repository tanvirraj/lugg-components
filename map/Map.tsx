import { browserEnv } from '@/env/browserEnv';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { createContext, useContext, useState } from 'react';
import { Marker } from './marker';
import { RouteLine } from './route-line';
import { Position } from 'geojson';

export interface MapProps
  extends Omit<React.ComponentProps<typeof GoogleMap>, 'center'> {
  center?: Position;
}

export const MapContext = createContext<typeof google>(undefined);
export const useMap = () => useContext(MapContext);

const MapRoot = ({ children, center, ...rest }: MapProps) => {
  const [googleMap, setGoogleMap] = useState<typeof google>(undefined);

  const onGoogleMapLoad = () => {
    if (window.google) {
      setGoogleMap(window.google);
    }
  };
  return (
    <MapContext.Provider value={googleMap}>
      <LoadScript
        onLoad={onGoogleMapLoad}
        googleMapsApiKey={browserEnv.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
      >
        <GoogleMap
          center={{ lat: center[0], lng: center[1] }}
          options={{
            disableDefaultUI: false,
            disableDoubleClickZoom: false,
            fullscreenControl: false,
            zoomControl: false,
            streetViewControl: false,
            scrollwheel: false,
            mapTypeControl: false,
            draggable: false,
            ...rest.options,
            maxZoom: 16,
          }}
          {...rest}
        >
          {children}
        </GoogleMap>
      </LoadScript>
    </MapContext.Provider>
  );
};

const defaultProps: MapProps = {
  zoom: 16,
};

MapRoot.defaultProps = defaultProps;

export const Map = Object.assign(MapRoot, { Marker, RouteLine });
