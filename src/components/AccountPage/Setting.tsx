import React from 'react';
import { SettingContainer, SettingText, SettingValue, Link } from './style';

interface SettingProps {
  name: string;
  value: string;
  onClick?: () => void;
}

const Setting: React.FC<SettingProps> = ({
  name,
  value,
  onClick: onValueClick,
}) => {
  return (
    <SettingContainer>
      <SettingText>{name}</SettingText>
      {onValueClick ? (
        <SettingValue>
          <Link onClick={onValueClick}>{value}</Link>
        </SettingValue>
      ) : (
        <SettingValue>{value}</SettingValue>
      )}
    </SettingContainer>
  );
};

export default Setting;
