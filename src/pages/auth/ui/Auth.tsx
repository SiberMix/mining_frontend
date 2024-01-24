import './Auth.scss'

import type { FormEvent } from 'react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CompanyLogo from '~shared/assets/logo.png'
import { RoutePath } from '~shared/config/route-config'

import { getTokenSelector } from '../../../../srcOld/redux/selectors/authSelectors'
import { getToken } from '../../../../srcOld/redux/slices/authSlice'
import { useAppDispatch } from '../../../../srcOld/redux/store'

export const Auth = () => {
  const dispatch = useAppDispatch()
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (token) {
      navigate(RoutePath.monitoring)
    }
  }, [token])

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
