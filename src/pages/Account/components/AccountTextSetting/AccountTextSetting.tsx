import React from 'react';
import * as Styled from './style';
import Spinner from 'components/Spinner/Spinner';

interface AccountTextSettingProps {
  label: string;
  value: string;
  Icon?: React.FunctionComponent;
  onClick?: () => void;
  loading?: boolean;
}

const AccountTextSetting: React.FC<AccountTextSettingProps> = ({
  label,
  value,
  Icon,
  onClick: onValueClick,
  loading,
}) => {
  const customizedSpinner = (
    <Spinner size={20} show={true} color="150, 150, 150" />
  );

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
            <Styled.Link onClick={onValueClick}>
              {loading ? customizedSpinner : value}
            </Styled.Link>
          </Styled.SettingValue>
        ) : (
          <Styled.SettingValue>
            {loading ? customizedSpinner : value}
          </Styled.SettingValue>
        )}
      </Styled.SettingTextContainer>
    </Styled.SettingContainer>
  );
};

export default AccountTextSetting;
