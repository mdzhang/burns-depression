import { User } from '../lib/types';
import { supabase } from '../lib/api';

interface Props {
  user: User | null;
}

function Topbar({ user }: Props) {
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error logging out: ${error}`);
    }
  };

  return (
    <header className="bg-white">
      <div
        className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8"
      >
        <a className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
        </a>

        <div className="flex items-center justify-end flex-1 md:justify-between">
          <nav className="hidden md:block" aria-labelledby="header-navigation">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/take-quiz">
                  Take Quiz
                </a>
              </li>
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/history">
                  History
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!user && (
              <div className="sm:gap-4 sm:flex">
                <a
                  className="hidden sm:block px-5 py-2.5 text-sm font-medium text-teal-600 bg-gray-100 rounded-md hover:text-teal-600/75 transition"
                  href="/login"
                >
                  Login
                </a>
              </div>
            )}
            {user && (
              <>
                <div className="sm:gap-4 sm:flex">
                  <span className="text-gray-500 text-sm">
                    Hi,
                    {' '}
                    {user.user_metadata?.full_name}
                  </span>
                </div>
                <div className="sm:gap-4 sm:flex">
                  <a
                    className="hidden sm:block px-5 py-2.5 text-sm font-medium text-teal-600 bg-gray-100 rounded-md hover:text-teal-600/75 transition"
                    href="/take-quiz"
                    onClick={onLogout}
                  >
                    Logout
                  </a>
                </div>
              </>
            )}

            <button
              type="button"
              className="block p-2.5 text-gray-600 transition bg-gray-100 rounded md:hidden hover:text-gray-600/75"
            >
              <span className="sr-only">Toggle menu</span>
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* end right bar */}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
