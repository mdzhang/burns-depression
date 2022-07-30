import { Menu } from 'antd';
import { User } from '../lib/types';
import LoginLogoutMenuItem from './LoginLogoutMenuItem';
import './RightMenu.css';

interface Props {
  user: User | null;
}

function RightMenu({ user }: Props) {
  return (
    <Menu mode="horizontal">
      <div className="greeting">
        Hi,
        {' '}
        {user?.user_metadata?.full_name || 'stranger'}
      </div>
      <LoginLogoutMenuItem user={user} />
    </Menu>
  );
}

export default RightMenu;
