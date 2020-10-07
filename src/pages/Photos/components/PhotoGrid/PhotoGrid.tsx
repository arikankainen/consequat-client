import React, { useEffect, useRef, useState } from 'react';
import {
  trackWindowScroll,
  ScrollPosition,
} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { PhotoUserExtended } from 'utils/types';
import PhotoGridItem from '../PhotoGridItem/PhotoGridItem';
import DropDownMenu from 'components/DropDownMenu/DropDownMenu';
import { DropDownAlign } from 'components/DropDownMenu/style';
import NotFound from 'components/NotFound/NotFound';
import { ReactComponent as NotFoundIcon } from 'images/tired-regular.svg';
import SearchOptions from '../SearchOptions/SearchOptions';
import SpinnerCentered from 'components/SpinnerCentered/SpinnerCentered';
import gridCalculator, { Dimension } from 'utils/gridCalculator';
import useContainerWidth from 'hooks/useContainerWidth';

import * as Styled from './style';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();

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
          <Styled.TopBar>
            <Styled.Text>
              {loading ? (
                <>Loading...</>
              ) : (
                <>
                  Found <Styled.Keyword>{photos.length}</Styled.Keyword> photos
                </>
              )}
            </Styled.Text>
            <DropDownMenu
              buttonName="Search options"
              alignContent={DropDownAlign.right}
            >
              <SearchOptions />
            </DropDownMenu>
          </Styled.TopBar>
          <Styled.TopicContainer>
            Browsing photos containing <Styled.Keyword>{search}</Styled.Keyword>
          </Styled.TopicContainer>
        </>
      ) : (
        <Styled.TopicContainer>Browsing all photos</Styled.TopicContainer>
      )}

      {loading && photos.length === 0 && <SpinnerCentered />}

      {notFound && !loading && (
        <NotFound
          topic="No photos found"
          text="Try different search terms"
          Icon={NotFoundIcon}
        />
      )}

      {!notFound && !loading && (
        <Styled.GridContainer
          ref={containerRef}
          style={{ height: totalHeight }}
        >
          {dimensions.map(dimension => (
            <Styled.ItemOuterContainer
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
                listAddress={`${location.pathname}${location.search}`}
              />
            </Styled.ItemOuterContainer>
          ))}
        </Styled.GridContainer>
      )}
    </>
  );
};

export default trackWindowScroll(PhotoGrid);
