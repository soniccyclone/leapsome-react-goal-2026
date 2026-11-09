import { Link } from 'react-router'
import { useGames } from '../games/GamesContext.tsx'
import type { Game } from '../games/types.ts'

export default function GameRow({ game }: { game: Game }) {
  const { dispatch } = useGames()
  return (
    <li>
      <Link to={`/game/${game.id}`}>{game.title}</Link>
      <span>{game.platform}</span>
      <span data-status={game.status}>{game.status}</span>
      <button type="button" onClick={() => dispatch({ type: 'remove', id: game.id })}>
        Remove <span className="sr-only">{game.title}</span>
      </button>
    </li>
  )
}
