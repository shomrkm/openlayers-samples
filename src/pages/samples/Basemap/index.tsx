import React from 'react';

import { BaseMap } from './Basemap';

const MyMap: React.FC = () => {
  return (
    <BaseMap initialZoom={16} initialCenter={[141.1378, 39.6987]} />
  )
};
export default MyMap;
