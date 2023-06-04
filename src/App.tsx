import React from 'react'
import {
  Route,
  Routes
} from 'react-router-dom'
import { Main } from './components/pages/Main'
import { Auth } from './components/pages/Auth'
import {
  atom,
  useAtomValue
} from 'jotai'

export const debugMode = false

// export const tokenAtom = atom('6126e8c08dbcb7cef6e4294b9eb76df6e46dc769')
export const tokenAtom = atom(localStorage.getItem('token') || '')

const App: React.FC = () => {
  const token = useAtomValue(tokenAtom)
  console.log(token)

  return (
    <div className="app">
      {!token
        ? (
          <Auth />
        )
        : (
          <Routes>
            <Route
              path="/"
              element={<Main />}
            />
          </Routes>
        )}
    </div>
  )
}

export default App
