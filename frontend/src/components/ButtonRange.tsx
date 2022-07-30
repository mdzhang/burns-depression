import { Radio } from 'antd';

interface Props {
  onClick: () => {};
}

function ButtonRange({ onClick }: Props) {
  return (
    <Radio.Group onChange={onClick} defaultValue="a">
      {
        [0, 1, 2, 3, 4]
          .map((num) => (
            <Radio.Button value={num}>
              {num}
            </Radio.Button>
          ))
      }
    </Radio.Group>
  );
}

export default ButtonRange;
