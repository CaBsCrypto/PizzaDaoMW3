/**
 * PizzaDAO Contest Phases
 */
export type ContestPhase = 'SUBMISSIONS' | 'VOTING'

// FORCED TO PAST FOR TESTING (Change back to 2026-05-16 later)
export const VOTING_START_DATE = new Date('2024-01-01T00:00:00-04:00') 

/**
 * Returns the current phase of the contest.
 * It can be overridden for testing purposes using localStorage or URL parameters.
 */
export function getCurrentPhase(): ContestPhase {
  console.log('Checking current phase...');
  
  // 1. Check for manual override (browser only)
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    const queryPhase = url.searchParams.get('phase')?.toLowerCase()
    
    console.log('Query param "phase" is:', queryPhase);

    if (queryPhase === 'voting' || queryPhase === 'votar') {
      return 'VOTING'
    }
    if (queryPhase === 'submissions' || queryPhase === 'postula') {
      return 'SUBMISSIONS'
    }

    const override = localStorage.getItem('PIZZADAO_PHASE_OVERRIDE')
    if (override === 'VOTING') return 'VOTING'
    if (override === 'SUBMISSIONS') return 'SUBMISSIONS'
  }

  // 2. Date-based logic
  const now = new Date()
  const currentPhase = now >= VOTING_START_DATE ? 'VOTING' : 'SUBMISSIONS'
  
  console.log('Final detected phase:', currentPhase);
  return currentPhase
}
