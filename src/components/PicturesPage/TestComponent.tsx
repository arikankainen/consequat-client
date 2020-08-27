import React from 'react';
import { Album } from '../../utils/types';

interface TestComponentProps {
  albums: Album[];
}

const TestComponent: React.FC<TestComponentProps> = ({ albums }) => {
  return (
    <div>
      {albums.map(album =>
        <div key={album.id}>
          <h1>{album.name}</h1>
          {album.photos.map(photo =>
            <div key={photo.id}>{photo.name}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestComponent;