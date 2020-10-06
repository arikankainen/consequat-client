import styled from 'styled-components/macro';

export const ErrorNotification = styled.div`
  margin-top: 5px;
  height: 25px;
  margin-bottom: -10px;
  color: #cc5555;
`;

export const SuccessNotification = styled(ErrorNotification)`
  color: #55cc55;
`;
