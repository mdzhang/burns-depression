import { withFormsy } from 'formsy-react';
import { Radio } from 'antd';

interface Props {
  setValue: any;
}

function ButtonRange({ setValue }: Props) {
  return (
    <Radio.Group onChange={setValue} defaultValue="a">
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

export default withFormsy(ButtonRange);
