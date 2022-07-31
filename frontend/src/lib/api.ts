import { createClient, Provider } from '@supabase/supabase-js';
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from './constants';
import { User, QuizResult } from './types';

export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY);

export async function signOut(): Promise<any> {
  return supabase.auth.signOut();
}

export async function signIn(provider: Provider): Promise<any> {
  return supabase.auth.signIn({ provider });
}

export async function saveResults(user: User, results: QuizResult[]) {
  const formatted = results.map((r) => ({
    user_id: user.id,
    result: JSON.stringify(r.answers),
  }));

  const { data, error } = await supabase.from('quiz_results').insert(formatted);

  if (error) {
    // eslint-disable-next-line no-console
    console.warn('Error saving results', error);
  } else {
    // eslint-disable-next-line no-console
    console.info('Saved results', data);
  }
}

export async function deleteAllResults(user: User) {
  return supabase.from('quiz_results').delete().match({ user_id: user.id });
}

export async function getResults() {
  return supabase.from('quiz_results');
}

export default supabase;
