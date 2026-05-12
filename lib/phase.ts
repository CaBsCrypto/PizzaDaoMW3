'use client'

/**
 * PizzaDAO Contest Phases
 */
export type ContestPhase = 'SUBMISSIONS' | 'VOTING'

export const VOTING_START_DATE = new Date('2026-05-16T00:00:00-04:00') // May 15th midnight (passing to 16th)

/**
 * Returns the current phase of the contest.
 * It can be overridden for testing purposes using localStorage.
 */
export function getCurrentPhase(): ContestPhase {
  // 1. Check for manual override in localStorage (browser only)
  if (typeof window !== 'undefined') {
    const override = localStorage.getItem('PIZZADAO_PHASE_OVERRIDE')
    if (override === 'VOTING') return 'VOTING'
    if (override === 'SUBMISSIONS') return 'SUBMISSIONS'
    
    // 2. Check for query parameter override
    const params = new URLSearchParams(window.location.search)
    const queryPhase = params.get('phase')
    if (queryPhase === 'voting') return 'VOTING'
    if (queryPhase === 'submissions') return 'SUBMISSIONS'
  }

  // 3. Date-based logic
  const now = new Date()
  return now >= VOTING_START_DATE ? 'VOTING' : 'SUBMISSIONS'
}
