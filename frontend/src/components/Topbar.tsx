import { useState } from 'react';
import { Affix, Drawer, Button } from 'antd';
import { User } from '../lib/types';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import './Topbar.css';

interface Props {
  user: User | null;
}

function Topbar({ user }: Props) {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Affix>
      <nav className="menu">
        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu />
          </div>
          <div className="menu_right">
            <RightMenu user={user} />
          </div>

          <Button className="menu__mobile-button" type="primary" onClick={() => setShowDrawer(true)}>
            <span className="barsBtn" />
          </Button>
          <Drawer
            title="Basic Drawer"
            className="menu_drawer"
            placement="right"
            closable={false}
            onClose={() => setShowDrawer(false)}
            visible={showDrawer}
          >
            <LeftMenu />
            <RightMenu user={user} />
          </Drawer>

        </div>
      </nav>
    </Affix>
  );
}

export default Topbar;
