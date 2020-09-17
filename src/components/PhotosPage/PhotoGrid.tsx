import React from 'react';
import { trackWindowScroll, ScrollPosition } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { PhotoUserExtended } from '../../utils/types';
import { TopBar, Text, TopicContainer, Keyword, GridContainer, Loading } from './style';
import PhotoGridItem from './PhotoGridItem';
import DropDownMenu, { DropDownAlign } from '../DropDownMenu/DropDownMenu';
import NotFound from '../NotFound/NotFound';
import { ReactComponent as NotFoundIcon } from '../../images/not_found.svg';
import SearchOptions from '../SearchOptions/SearchOptions';

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

      {!notFound && loading && <Loading>Loading...</Loading>}

      {!notFound && !loading && (
        <GridContainer>
          {photos.map(photo => (
            <PhotoGridItem key={photo.id} photo={photo} scrollPosition={scrollPosition} />
          ))}
        </GridContainer>
      )}
    </>
  );
};

export default trackWindowScroll(PhotoGrid);
