import { useState, type FormEvent } from 'react'
import { useGames } from '../games/GamesContext.tsx'

export default function AddGameForm() {
  const { dispatch } = useGames()
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    dispatch({
      type: 'add',
      game: { id: crypto.randomUUID(), title: t, platform: platform.trim(), status: 'backlog' },
    })
    setTitle('')
    setPlatform('')
  }

  return (
    <form onSubmit={submit}>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Platform
        <input value={platform} onChange={(e) => setPlatform(e.target.value)} />
      </label>
      <button type="submit">Add game</button>
    </form>
  )
}
