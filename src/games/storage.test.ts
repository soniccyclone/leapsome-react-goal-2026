import { beforeEach, describe, expect, it } from 'vitest'
import { STORAGE_KEY, load, save } from './storage.ts'
import type { Game } from './types.ts'

const games: Game[] = [{ id: '1', title: 'Zelda', platform: 'Switch', status: 'playing' }]

describe('storage', () => {
  beforeEach(() => localStorage.clear())

  it('round trips', () => {
    save(games)
    expect(load()).toEqual(games)
  })

  it.each([
    ['invalid JSON', '{nope'],
    ['a non-array', '{"id":"1"}'],
    ['an array with a bad status', JSON.stringify([{ ...games[0], status: 'bogus' }])],
  ])('%s yields an empty list', (_name, raw) => {
    localStorage.setItem(STORAGE_KEY, raw)
    expect(load()).toEqual([])
  })
})
