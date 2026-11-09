import type { Game, Status } from './types.ts'

export type Action =
  | { type: 'add'; game: Game }
  | { type: 'remove'; id: string }
  | { type: 'setStatus'; id: string; status: Status }

export function reducer(state: Game[], action: Action): Game[] {
  switch (action.type) {
    case 'add':
      return [...state, action.game]
    case 'remove':
      return state.filter((g) => g.id !== action.id)
    case 'setStatus':
      return state.map((g) =>
        g.id === action.id ? { ...g, status: action.status } : g,
      )
    default:
      return state
  }
}
