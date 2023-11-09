import { Menu } from 'antd';
import { useContext, useState } from 'react';
import { supabase } from '@burns-depression/lib/api';
import { AppContext } from '@burns-depression/lib/contexts';
import { AppActionKind } from '@burns-depression/lib/reducers';
import LoginModal from '@burns-depression/components/LoginModal';

function LoginLogoutMenuItem() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: { user }, dispatch } = useContext(AppContext);
  const closeModal = () => setIsModalVisible(false);

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error logging out: ${error}`);
    } else {
      dispatch({ type: AppActionKind.LOGOUT });
    }
  };

  return (
    <Menu.Item key="login-logout">
      {user ? (
        <a href="/logout" onClick={onLogout}>Logout</a>
      ) : (
        <a href="#" onClick={() => setIsModalVisible(true)}>Login</a>
      )}
      <LoginModal visible={isModalVisible} onClose={closeModal} />
    </Menu.Item>
  );
}

export default LoginLogoutMenuItem;
