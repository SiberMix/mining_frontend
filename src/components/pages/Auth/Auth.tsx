import type { FormEvent } from 'react'
import React, { useState } from 'react'
import CompanyLogo from '/src/assets/logo.png'
import './Auth.modules.css'
import { useAppDispatch } from '../../../redux/store'
import { getToken } from '../../../redux/slices/authSlice'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      dispatch(getToken({
        username,
        password
      }))
    } catch {
      setError('Ошибка сервера.')
    }
  }

  return (
    <div className='root'>

      <img
        className='logo'
        id='displayed'
        alt='logo'
        src={CompanyLogo}
      />
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <input
          className='input'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='username'
        />
        <input
          className='input'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />
        <button
          className='button'
          type='submit'
        >
          ➤
        </button>
        {error
          ? <div className='error'>
            {error}
          </div>
          : null}
      </form>
    </div>
  )
}

export default LoginPage
