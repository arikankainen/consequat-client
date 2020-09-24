import React from 'react';
import NotFound from '../NotFound/NotFound';
import { ReactComponent as Icon } from '../../images/frown-regular.svg';

const NotFoundPage = () => {
  return (
    <NotFound
      topic="Content not found!"
      text="The address you entered does not exist"
      Icon={Icon}
    />
  );
};

export default NotFoundPage;
