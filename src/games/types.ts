export const STATUSES = ['backlog', 'playing', 'done'] as const

export type Status = (typeof STATUSES)[number]

export type Game = {
  id: string
  title: string
  platform: string
  status: Status
}
