/**
 * PizzaDAO Contest Phases
 */
export type ContestPhase = 'SUBMISSIONS' | 'VOTING'

export const VOTING_START_DATE = new Date('2026-05-16T00:00:00-04:00') // May 15th midnight (passing to 16th)

/**
 * Returns the current phase of the contest.
 * It can be overridden for testing purposes using localStorage or URL parameters.
 */
export function getCurrentPhase(): ContestPhase {
  // 1. Check for manual override (browser only)
  if (typeof window !== 'undefined') {
    // Check Query Parameter FIRST (highest priority for quick testing)
    const url = new URL(window.location.href)
    const queryPhase = url.searchParams.get('phase')?.toLowerCase()
    
    if (queryPhase === 'voting' || queryPhase === 'votar') {
      console.log('Phase override detected via URL: VOTING')
      return 'VOTING'
    }
    if (queryPhase === 'submissions' || queryPhase === 'postula') {
      console.log('Phase override detected via URL: SUBMISSIONS')
      return 'SUBMISSIONS'
    }

    // Check LocalStorage
    const override = localStorage.getItem('PIZZADAO_PHASE_OVERRIDE')
    if (override === 'VOTING') return 'VOTING'
    if (override === 'SUBMISSIONS') return 'SUBMISSIONS'
  }

  // 2. Date-based logic
  const now = new Date()
  const currentPhase = now >= VOTING_START_DATE ? 'VOTING' : 'SUBMISSIONS'
  
  return currentPhase
}
