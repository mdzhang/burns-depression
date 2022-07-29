import { Menu } from 'antd';
import { User } from '../lib/types';
import { supabase } from '../lib/api';

interface Props {
  user: User | null;
}

function RightMenu({ user }: Props) {
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error logging out: ${error}`);
    }
  };
  // const username = user?.user_metadata?.full_name;

  return (
    <Menu mode="horizontal">
      <Menu.Item key="login-logout">
        {user ? (
          <a href="/logout" onClick={onLogout}>Logout</a>
        ) : (
          <a href="/login">Login</a>
        )}
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;
