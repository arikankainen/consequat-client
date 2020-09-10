import React from 'react';
import {
  SettingContainer,
  SettingTextContainer,
  Label,
  SettingValue,
  Link,
  IconContainer,
} from './style';

interface TextSettingProps {
  label: string;
  value: string;
  Icon: React.FunctionComponent;
  onClick?: () => void;
}

const TextSetting: React.FC<TextSettingProps> = ({
  label,
  value,
  Icon,
  onClick: onValueClick,
}) => {
  return (
    <SettingContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <SettingTextContainer>
        <Label>{label}</Label>
        {onValueClick ? (
          <SettingValue>
            <Link onClick={onValueClick}>{value}</Link>
          </SettingValue>
        ) : (
          <SettingValue>{value}</SettingValue>
        )}
      </SettingTextContainer>
    </SettingContainer>
  );
};

export default TextSetting;
