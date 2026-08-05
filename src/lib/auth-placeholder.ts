/**
 * Supabase authentication placeholder.
 *
 * TODO: enable Lovable Cloud, then replace these stubs with real
 * `supabase.auth` calls (`signInWithPassword`, `signInWithOAuth`, `signOut`,
 * `onAuthStateChange`) and a `profiles` table for display name / avatar.
 */

export type SessionUser = {
  id: string;
  displayName: string;
  initials: string;
  plan: string;
};

export const demoUser: SessionUser = {
  id: "demo-user",
  displayName: "Ada Amari",
  initials: "AA",
  plan: "TripleA Pro",
};

export function useSessionPlaceholder() {
  // TODO: swap for real session state once Cloud auth is enabled.
  return { user: demoUser, isAuthenticated: true, isLoading: false };
}

export async function signOutPlaceholder(): Promise<void> {
  // TODO: await supabase.auth.signOut()
  return;
}
