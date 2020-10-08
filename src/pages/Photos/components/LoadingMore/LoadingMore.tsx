import React from 'react';
import * as Styled from './style';
import Spinner from 'components/Spinner/Spinner';

interface LoadingMoreProps {
  refProp: (node: HTMLDivElement) => void;
  loading: boolean;
}

const LoadingMore: React.FC<LoadingMoreProps> = ({ refProp, loading }) => {
  return (
    <Styled.Container ref={refProp} show={loading}>
      {loading && (
        <Spinner show={loading} color="90, 90, 90" bgcolor="248, 248, 250" />
      )}
    </Styled.Container>
  );
};

export default LoadingMore;
