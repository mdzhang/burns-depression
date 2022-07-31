import { useContext } from 'react';
import { Menu } from 'antd';
import LoginLogoutMenuItem from './LoginLogoutMenuItem';
import { UserContext } from '../lib/contexts';
import './RightMenu.css';

function RightMenu() {
  const userCtx = useContext(UserContext);

  return (
    <Menu mode="horizontal">
      <div className="greeting">
        Hi,
        {' '}
        {userCtx.user?.user_metadata?.full_name || 'stranger'}
      </div>
      <LoginLogoutMenuItem />
    </Menu>
  );
}

export default RightMenu;
