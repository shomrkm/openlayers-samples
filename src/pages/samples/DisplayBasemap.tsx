import React from 'react';

import { BaseMap } from '@/components/Basemap';

const DisplayBasemap: React.FC = () => {
  return (
    <BaseMap initialZoom={16} initialCenter={[141.1378, 39.6987]} />
  )
};
export default DisplayBasemap;
