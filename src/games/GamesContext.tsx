import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from 'react'
import { reducer, type Action } from './reducer.ts'
import { load, save } from './storage.ts'
import type { Game } from './types.ts'

type Value = { games: Game[]; dispatch: ActionDispatch<[Action]> }

const GamesContext = createContext<Value | null>(null)

export function GamesProvider({ children }: { children: ReactNode }) {
  const [games, dispatch] = useReducer(reducer, undefined, load)
  useEffect(() => save(games), [games])
  return <GamesContext value={{ games, dispatch }}>{children}</GamesContext>
}

export function useGames(): Value {
  const value = useContext(GamesContext)
  if (!value) throw new Error('useGames must be used inside GamesProvider')
  return value
}
