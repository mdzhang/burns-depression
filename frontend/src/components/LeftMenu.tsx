import { Menu } from 'antd';

function LeftMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="take-quiz">
        <a href="/take-quiz">Take Quiz</a>
      </Menu.Item>
      <Menu.Item key="history">
        <a href="/history">History</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
