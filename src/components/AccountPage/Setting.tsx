import React from 'react';
import { SettingContainer, SettingText, SettingValue } from './style';

interface SettingProps {
  name: string;
  value: string;
}

const Setting: React.FC<SettingProps> = ({ name, value }) => {
  return (
    <SettingContainer>
      <SettingText>{name}</SettingText>
      <SettingValue>{value}</SettingValue>
    </SettingContainer>
  );
};

export default Setting;
