import { STATUSES, type Game } from './types.ts'

export const STORAGE_KEY = 'backlog.games'

function isGame(v: unknown): v is Game {
  if (typeof v !== 'object' || v === null) return false
  const g = v as Record<string, unknown>
  return (
    typeof g.id === 'string' &&
    typeof g.title === 'string' &&
    typeof g.platform === 'string' &&
    (STATUSES as readonly unknown[]).includes(g.status)
  )
}

export function load(): Game[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) && parsed.every(isGame) ? parsed : []
  } catch {
    return []
  }
}

export function save(games: Game[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
}
