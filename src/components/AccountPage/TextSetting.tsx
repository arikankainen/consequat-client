import React from 'react';
import { SettingContainer, SettingLabel, SettingValue, Link } from './style';

interface TextSettingProps {
  label: string;
  value: string;
  onClick?: () => void;
}

const TextSetting: React.FC<TextSettingProps> = ({
  label,
  value,
  onClick: onValueClick,
}) => {
  return (
    <SettingContainer>
      <SettingLabel>{label}</SettingLabel>
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
