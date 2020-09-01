import React from 'react';
import { SettingContainer, SettingText, SettingValue, Link } from './style';

interface TextSettingProps {
  name: string;
  value: string;
  onClick?: () => void;
}

const TextSetting: React.FC<TextSettingProps> = ({
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

export default TextSetting;
