import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { clearLogin } from 'reducers/systemReducer';
import storageToken from 'utils/storageToken';
import { setMessage } from 'reducers/notificationReducer';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state: RootState) => state.system);

  useEffect(() => {
    if (loginStatus && loginStatus.loggedIn) {
      dispatch(
        setMessage(
          'Logged out',
          `${loginStatus.loggedUser?.fullname} logged out successfully.`
        )
      );
      dispatch(clearLogin());
      storageToken.removeToken();
    }

    history.replace('/');
  }, []); // eslint-disable-line

  return null;
};

export default Logout;
