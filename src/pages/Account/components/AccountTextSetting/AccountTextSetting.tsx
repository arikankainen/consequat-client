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
  const customizedSpinner = <Spinner size={20} show={true} color="150, 150, 150" />;

  return (
    <Styled.SettingContainer>
      {Icon && (
        <Styled.IconContainer>
          <Icon />
        </Styled.IconContainer>
      )}
      <Styled.SettingTextContainer>
        <Styled.Label>
          {label}
          {onValueClick && (
            <Styled.Link onClick={onValueClick}>{!loading && <>change</>}</Styled.Link>
          )}
        </Styled.Label>
        <Styled.SettingValue>{loading ? customizedSpinner : value}</Styled.SettingValue>
      </Styled.SettingTextContainer>
    </Styled.SettingContainer>
  );
};

export default AccountTextSetting;
