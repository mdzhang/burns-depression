import { Button, Modal } from 'antd';
import { signIn } from '../lib/api';

interface Props {
  visible: boolean;
  onClose: () => any;
}

function LoginModal({ visible, onClose }: Props) {
  const handleOAuthLogin = async (provider: any) => {
    const { error } = await signIn(provider);
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Error: ', error.message);
    } else {
      // upload unsubmitted results
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      title="Login"
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => handleOAuthLogin('github')}
        >
          Github
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => handleOAuthLogin('google')}
        >
          Google
        </Button>,
      ]}
    >
      Login to keep track of your results week to week.
      We won’t sell your data, and we won’t email you.
    </Modal>
  );
}

export default LoginModal;
