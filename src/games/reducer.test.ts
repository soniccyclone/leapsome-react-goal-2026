import { describe, expect, it } from 'vitest'
import { reducer, type Action } from './reducer.ts'
import type { Game } from './types.ts'

const zelda: Game = { id: '1', title: 'Zelda', platform: 'Switch', status: 'backlog' }
const mario: Game = { id: '2', title: 'Mario', platform: 'Switch', status: 'backlog' }

describe('reducer', () => {
  it('add appends a game', () => {
    expect(reducer([zelda], { type: 'add', game: mario })).toEqual([zelda, mario])
  })

  it('remove drops only the matching game', () => {
    expect(reducer([zelda, mario], { type: 'remove', id: '1' })).toEqual([mario])
  })

  it('setStatus changes only the matching game', () => {
    expect(reducer([zelda, mario], { type: 'setStatus', id: '1', status: 'done' })).toEqual([
      { ...zelda, status: 'done' },
      mario,
    ])
  })

  it('unknown action returns the same state reference', () => {
    const state = [zelda]
    expect(reducer(state, { type: 'nope' } as unknown as Action)).toBe(state)
  })
})
