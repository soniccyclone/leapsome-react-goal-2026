import { useState } from 'react'
import { useGames } from '../games/GamesContext.tsx'
import GameRow from './GameRow.tsx'
import StatusFilter, { type Filter } from './StatusFilter.tsx'

export default function GameList() {
  const { games } = useGames()
  const [filter, setFilter] = useState<Filter>('all')
  const shown = filter === 'all' ? games : games.filter((g) => g.status === filter)
  return (
    <>
      <StatusFilter value={filter} onChange={setFilter} />
      <ul>
        {shown.map((g) => (
          <GameRow key={g.id} game={g} />
        ))}
      </ul>
    </>
  )
}
