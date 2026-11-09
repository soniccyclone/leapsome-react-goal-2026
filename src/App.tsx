import { Route, Routes } from 'react-router'
import './App.css'
import AddGameForm from './components/AddGameForm.tsx'
import GameDetail from './components/GameDetail.tsx'
import GameList from './components/GameList.tsx'

function Home() {
  return (
    <>
      <h1>Backlog</h1>
      <AddGameForm />
      <GameList />
    </>
  )
}

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
      </Routes>
    </main>
  )
}
