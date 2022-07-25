import { withFormsy } from 'formsy-react';

const defaultProps = {
  offset: 0,
};

interface Props {
  setValue: any;
  value: string;
  offset?: number;
}

function ButtonRange({ setValue, value, offset = 0 }: Props) {
  const defaultClassNames = 'flex-shrink-0  text-sm border-4 text-white py-1 px-2 rounded';
  const unselectedClassNames = 'bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700';
  const selectedClassNames = 'bg-teal-700 border-teal-700';
  const selected = (val: string) => value === val;

  return (
    <div>
      {[0, 1, 2, 3, 4]
        .map((num) => (
          <button
            style={{ margin: '0 5px' }}
            onClick={() => setValue((num + offset).toString())}
            className={`${defaultClassNames} ${
              selected((num + offset).toString())
                ? selectedClassNames
                : unselectedClassNames
            }`}
            type="button"
          >
            {num + offset}
          </button>
        ))}
    </div>
  );
}

ButtonRange.defaultProps = defaultProps;

export default withFormsy(ButtonRange);
