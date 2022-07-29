import { Menu } from 'antd';
import { useState } from 'react';
import { User } from '../lib/types';
import { supabase } from '../lib/api';
import LoginModal from './LoginModal';

interface Props {
  user: User | null;
}

function RightMenu({ user }: Props) {
  console.log(user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error logging out: ${error}`);
    }
  };

  return (
    <>
      <Menu mode="horizontal">
        <div>
          Hi,
          {' '}
          {user?.user_metadata?.full_name}
        </div>
        <Menu.Item key="login-logout">
          {user ? (
            <a href="/logout" onClick={onLogout}>Logout</a>
          ) : (
            <a href="#" onClick={() => setIsModalVisible(true)}>Login</a>
          )}
        </Menu.Item>
      </Menu>
      <LoginModal visible={isModalVisible} onClose={closeModal} />
    </>
  );
}

export default RightMenu;
