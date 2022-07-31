import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

function LeftMenu() {
  const navigate = useNavigate();

  return (
    <Menu mode="horizontal">
      <Menu.Item key="take-quiz">
        <a href="#" onClick={() => navigate('/take-quiz')}>Take Quiz</a>
      </Menu.Item>
      <Menu.Item key="history">
        <a href="#" onClick={() => navigate('/history')}>History</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
