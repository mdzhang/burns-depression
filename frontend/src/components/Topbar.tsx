import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Menu, Affix, Drawer,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import LoginLogoutMenuItem from './LoginLogoutMenuItem';
import './Topbar.css';

function Topbar() {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);

  const goToPage = (page: string) => {
    navigate(page);
    setShowDrawer(false);
  };

  return (
    <Affix>
      <nav className="menu">
        <div className="menu_container">
          <div className="menu_left">
            <LeftMenu />
          </div>
          <div className="menu_right">
            <RightMenu />
          </div>

          <div className="menu_mobile-button">
            <MenuOutlined onClick={() => setShowDrawer(true)} />
          </div>

          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setShowDrawer(false)}
            open={showDrawer}
          >
            <Menu style={{ border: 'none' }}>
              <Menu.Item key="take-quiz">
                <a href="#" onClick={() => goToPage('/take-quiz?page=1')}>Take Quiz</a>
              </Menu.Item>
              <Menu.Item key="history">
                <a href="#" onClick={() => goToPage('/history')}>History</a>
              </Menu.Item>
              <LoginLogoutMenuItem />
            </Menu>
          </Drawer>
        </div>
      </nav>
    </Affix>
  );
}

export default Topbar;
