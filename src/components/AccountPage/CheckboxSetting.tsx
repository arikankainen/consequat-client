import React from 'react';
import { SettingContainer, SettingText, SettingDescription } from './style';

interface CheckboxSettingProps {
  name: string;
  description: string;
}

const CheckboxSetting: React.FC<CheckboxSettingProps> = ({
  name,
  description,
}) => {
  return (
    <SettingContainer>
      <SettingText>{name}</SettingText>
      <SettingDescription>{description}</SettingDescription>
    </SettingContainer>
  );
};

export default CheckboxSetting;
