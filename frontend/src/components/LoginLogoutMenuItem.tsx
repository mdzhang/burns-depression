import { Menu } from 'antd';
import { useContext, useState } from 'react';
import { supabase } from '../lib/api';
import { AppContext } from '../lib/contexts';
import LoginModal from './LoginModal';

function LoginLogoutMenuItem() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const userCtx = useContext(AppContext);

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    // TODO: dispatch to clear history
    if (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error logging out: ${error}`);
    }
  };

  return (
    <Menu.Item key="login-logout">
      {userCtx.user ? (
        <a href="/logout" onClick={onLogout}>Logout</a>
      ) : (
        <a href="#" onClick={() => setIsModalVisible(true)}>Login</a>
      )}
      <LoginModal visible={isModalVisible} onClose={closeModal} />
    </Menu.Item>
  );
}

export default LoginLogoutMenuItem;
