import { Link, useParams } from 'react-router'
import { useGames } from '../games/GamesContext.tsx'
import { STATUSES, type Status } from '../games/types.ts'

export default function GameDetail() {
  const { id } = useParams()
  const { games, dispatch } = useGames()
  const game = games.find((g) => g.id === id)

  if (!game) {
    return (
      <>
        <p>Game not found</p>
        <Link to="/">Back</Link>
      </>
    )
  }

  return (
    <>
      <h1>{game.title}</h1>
      <p>{game.platform}</p>
      <label>
        Status
        <select
          value={game.status}
          onChange={(e) =>
            dispatch({ type: 'setStatus', id: game.id, status: e.target.value as Status })
          }
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <Link to="/">Back</Link>
    </>
  )
}
