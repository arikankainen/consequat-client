import React, { useEffect, useRef, useState } from 'react';
import { trackWindowScroll, ScrollPosition } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { PhotoUserExtended } from '../../utils/types';
import {
  TopBar,
  Text,
  TopicContainer,
  Keyword,
  GridContainer,
  ItemOuterContainer,
} from './style';
import PhotoGridItem from './PhotoGridItem';
import DropDownMenu, { DropDownAlign } from '../DropDownMenu/DropDownMenu';
import NotFound from '../NotFound/NotFound';
import { ReactComponent as NotFoundIcon } from '../../images/tired-regular.svg';
import SearchOptions from '../SearchOptions/SearchOptions';
import CenteredSpinner from '../Spinner/CenteredSpinner';
import gridCalculator, { Dimension } from '../../utils/gridCalculator';
import useContainerWidth from '../../hooks/useContainerWidth';

interface PhotoGridProps {
  photos: PhotoUserExtended[];
  search: string | undefined | null;
  scrollPosition: ScrollPosition;
  notFound: boolean;
  loading: boolean;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  search,
  scrollPosition,
  notFound,
  loading,
}) => {
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [totalHeight, setTotalHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(containerRef);

  useEffect(() => {
    const grid = gridCalculator({
      photos,
      containerWidth,
      preferredImageHeight: 200,
      gap: 7,
    });

    if (grid) {
      setDimensions(grid.dimensions);
      setTotalHeight(grid.totalHeight);
    }
  }, [photos, containerWidth]);

  if (!photos) return null;
  return (
    <>
      {search ? (
        <>
          <TopBar>
            <Text>
              {loading ? (
                <>Loading...</>
              ) : (
                <>
                  Found <Keyword>{photos.length}</Keyword> photos
                </>
              )}
            </Text>
            <DropDownMenu buttonName="Search options" alignContent={DropDownAlign.right}>
              <SearchOptions />
            </DropDownMenu>
          </TopBar>
          <TopicContainer>
            Browsing photos containing <Keyword>{search}</Keyword>
          </TopicContainer>
        </>
      ) : (
        <TopicContainer>Browsing all photos</TopicContainer>
      )}

      {notFound && (
        <NotFound
          topic="No photos found"
          text="Try different search terms"
          Icon={NotFoundIcon}
        />
      )}

      {!notFound && loading && <CenteredSpinner />}

      {!notFound && !loading && (
        <GridContainer ref={containerRef} style={{ height: totalHeight }}>
          {dimensions.map(dimension => (
            <ItemOuterContainer
              key={dimension.index}
              style={{
                top: dimension.top,
                left: dimension.left,
                width: dimension.width,
                height: dimension.height,
                backgroundColor: '#ddd',
              }}
            >
              <PhotoGridItem
                photo={photos[dimension.index]}
                scrollPosition={scrollPosition}
              />
            </ItemOuterContainer>
          ))}
        </GridContainer>
      )}
    </>
  );
};

export default trackWindowScroll(PhotoGrid);
