import { OverlayView } from '@react-google-maps/api';
import clsx from 'clsx';
import styles from './Marker.module.css';
import { Position } from 'geojson';

export interface MarkerProps
  extends Omit<
    React.ComponentProps<typeof OverlayView>,
    'position' | 'getPixelPositionOffset'
  > {
  position?: Position;
}

const getPixelPositionOffset = (offsetWidth: number, offsetHeight: number) => ({
  x: -(offsetWidth / 2),
  y: -(offsetHeight / 2),
});

const Marker = ({ position, children, mapPaneName }: MarkerProps) => {
  const classes = clsx(
    'flex -translate-y-[30px]  items-center rounded-full border-2 border-white bg-brand px-20 py-10 font-bold text-white text-13 drop-shadow-xl font-sans antialiased',
    styles.bottomline
  );

  return (
    <OverlayView
      mapPaneName={mapPaneName}
      position={{ lat: position?.[0], lng: position?.[1] }}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className={classes}>{children}</div>
    </OverlayView>
  );
};

const defaultProps: MarkerProps = {
  mapPaneName: OverlayView.OVERLAY_MOUSE_TARGET,
};

Marker.defaultProps = defaultProps;

export { Marker };
