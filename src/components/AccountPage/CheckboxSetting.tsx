import React from 'react';
import {
  SettingContainer,
  SettingLabel,
  SettingDescription,
  Checkbox,
  CheckboxContainer,
} from './style';

interface CheckboxSettingProps {
  name: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxSetting: React.FC<CheckboxSettingProps> = ({
  name,
  label,
  description,
  checked,
  onChange,
}) => {
  return (
    <SettingContainer>
      <CheckboxContainer>
        <Checkbox name={name} checked={checked} onChange={onChange} />
        <SettingLabel htmlFor={name}>{label}</SettingLabel>
      </CheckboxContainer>
      <SettingDescription>{description}</SettingDescription>
    </SettingContainer>
  );
};

export default CheckboxSetting;
