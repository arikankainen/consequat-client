import React from 'react';
import * as Styled from './style';

interface AccountTextSettingProps {
  label: string;
  value: string;
  Icon?: React.FunctionComponent;
  onClick?: () => void;
}

const AccountTextSetting: React.FC<AccountTextSettingProps> = ({
  label,
  value,
  Icon,
  onClick: onValueClick,
}) => {
  return (
    <Styled.SettingContainer>
      {Icon && (
        <Styled.IconContainer>
          <Icon />
        </Styled.IconContainer>
      )}
      <Styled.SettingTextContainer>
        <Styled.Label>{label}</Styled.Label>
        {onValueClick ? (
          <Styled.SettingValue>
            <Styled.Link onClick={onValueClick}>{value}</Styled.Link>
          </Styled.SettingValue>
        ) : (
          <Styled.SettingValue>{value}</Styled.SettingValue>
        )}
      </Styled.SettingTextContainer>
    </Styled.SettingContainer>
  );
};

export default AccountTextSetting;
