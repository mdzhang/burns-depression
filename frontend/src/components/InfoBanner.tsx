interface Props {
  title: string;
  message?: string;
  onClick?: () => void;
}

const defaultProps = {
  message: '',
  onClick: () => {},
};

function InfoBanner({ title, message, onClick }: Props) {
  return (
    <div
      className="flex items-center justify-between gap-4 p-4 border rounded text-sky-700 border-sky-900/10 bg-sky-50"
      role="alert"
    >
      <div className="flex items-center gap-4">
        <span className="p-2 text-white rounded-full bg-sky-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        <p>
          <strong className="text-sm font-medium">
            <button onClick={onClick} type="button">
              {' '}
              {title}
              {' '}
            </button>
          </strong>

          <span className="block text-xs opacity-90">
            {message}
          </span>
        </p>
      </div>

      <button className="opacity-90" type="button">
        <span className="sr-only"> Close </span>

        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

InfoBanner.defaultProps = defaultProps;

export default InfoBanner;
