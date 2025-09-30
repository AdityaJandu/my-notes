import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreateNotePage from './pages/CreateNotePage'
import NoteDetailPage from './pages/NoteDetailPage'

const App = () => {
  return (
    <div data-theme="dracula" >
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/create' element={<CreateNotePage />}></Route>
        <Route path='/note/:id' element={<NoteDetailPage />}></Route>
      </Routes>
    </div>
  )
}

export default App