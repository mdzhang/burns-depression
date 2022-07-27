import { supabase } from '../lib/api';

function Auth() {
  const handleOAuthLogin = async (provider: any) => {
    const { error } = await supabase.auth.signIn({ provider });
    // eslint-disable-next-line no-console
    if (error) console.log('Error: ', error.message);
  };

  const buttonClassNames = 'w-3/4 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:border-teal-500 focus:shadow-outline-teal active:bg-teal-500 transition duration-150 ease-in-out';

  return (
    <div className="my-16">

      <div
        className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base border m-auto"
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full mx-1.5 border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm leading-5">
            <span className="px-2 bg-white text-gray-500">
              Continue with
            </span>
          </div>
        </div>

        <div>
          <div className="mt-3">
            <span className="block rounded-md shadow-sm">
              <button
                onClick={() => handleOAuthLogin('github')}
                type="button"
                className={buttonClassNames}
              >
                GitHub
              </button>
            </span>
          </div>
          <div className="mt-3">
            <span className="block rounded-md shadow-sm">
              <button
                onClick={() => handleOAuthLogin('google')}
                type="button"
                className={buttonClassNames}
              >
                Google
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
