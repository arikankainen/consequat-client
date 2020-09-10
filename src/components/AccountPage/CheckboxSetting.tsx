import React from 'react';
import {
  SettingContainer,
  SettingTextContainer,
  Label,
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
      <SettingTextContainer>
        <CheckboxContainer>
          <Checkbox name={name} checked={checked} onChange={onChange} />
          <Label htmlFor={name}>{label}</Label>
        </CheckboxContainer>

        <SettingDescription>{description}</SettingDescription>
      </SettingTextContainer>
    </SettingContainer>
  );
};

export default CheckboxSetting;
