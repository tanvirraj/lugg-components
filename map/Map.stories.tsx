import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Map, MapProps } from '@/components/ui/core/map';

export default {
  title: 'atoms/Map',
  component: Map,
} as Meta;

const origin = [40.7377036, -111.8707477];
const destination = [40.7380216, -111.8653421];

const Template: Story<MapProps> = () => (
  <Map mapContainerClassName='rounded-xl w-full h-[400px]' center={origin}>
    <Map.Marker position={origin}>Pickup</Map.Marker>
    <Map.Marker position={destination}>Destination</Map.Marker>
    <Map.RouteLine origin={origin} destination={destination} />
  </Map>
);

export const Default = Template.bind({});
