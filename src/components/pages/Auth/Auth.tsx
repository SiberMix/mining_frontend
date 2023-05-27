import type { FormEvent } from 'react'
import React, { useState } from 'react'
import CompanyLogo from '/src/assets/logo.png'
import { useSetAtom } from 'jotai'
import { tokenAtom } from '../../../App'
import './Auth.modules.css'
import { authService } from '../../../api/auth'

const LoginPage = () => {
  const setToken = useSetAtom(tokenAtom)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { data } = await authService.login(username, password)
      if (data.auth_token) {
        localStorage.setItem('token', data.auth_token)
        setToken(data.auth_token)
      } else {
        setError('Неверное имя пользователя или пароль. Попробуйте еще раз.')
      }
    } catch {
      setError('Ошибка сервера.')
    }
  }

  return (
    <div className="root">

      <img
        className="logo"
        id="displayed"
        alt="logo"
        src={CompanyLogo}
      />
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <input
          className="input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          className="button"
          type="submit"
        >
          ➤
        </button>
        {error
          ? <div className="error">
            {error}
          </div>
          : null}
      </form>
    </div>
  )
}

export default LoginPage
