import { useContext } from 'react';
import { Menu } from 'antd';
import LoginLogoutMenuItem from '@burns-depression/components/LoginLogoutMenuItem';
import { AppContext } from '@burns-depression/lib/contexts';
import './RightMenu.css';

function RightMenu() {
  const { data: { user } } = useContext(AppContext);

  return (
    <Menu mode="horizontal">
      <div className="greeting">
        Hi,
        {' '}
        {user?.user_metadata?.full_name || 'stranger'}
      </div>
      <LoginLogoutMenuItem />
    </Menu>
  );
}

export default RightMenu;
