import { useState } from 'react';
import {
  Menu, Affix, Drawer,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { User } from '../lib/types';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import LoginLogoutMenuItem from './LoginLogoutMenuItem';
import './Topbar.css';

interface Props {
  user: User | null;
}

function Topbar({ user }: Props) {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Affix>
      <nav className="menu">
        <div className="menu_container">
          <div className="menu_left">
            <LeftMenu />
          </div>
          <div className="menu_right">
            <RightMenu user={user} />
          </div>

          <div className="menu_mobile-button">
            <MenuOutlined onClick={() => setShowDrawer(true)} />
          </div>

          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setShowDrawer(false)}
            visible={showDrawer}
          >
            <Menu>
              <Menu.Item key="take-quiz">
                <a href="/take-quiz">Take Quiz</a>
              </Menu.Item>
              <Menu.Item key="history">
                <a href="/history">History</a>
              </Menu.Item>
              <LoginLogoutMenuItem user={user} />
            </Menu>
          </Drawer>
        </div>
      </nav>
    </Affix>
  );
}

export default Topbar;
