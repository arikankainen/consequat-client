import React from 'react';
import userImage from '../../images/menu_user.png';
import { UserImage, UserName, UserMenuButton } from './Styles';

interface UserMenuProps {
  username: string | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ username }) => {
  return (
    <UserMenuButton to='/logout'>
      <UserName>{username}</UserName>
      <UserImage src={userImage} />
    </UserMenuButton>
  );
};

export default UserMenu;