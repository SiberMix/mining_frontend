import './Auth.scss'

import type { FormEvent } from 'react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getTokenSelector } from '~processes/redux/selectors/authSelectors'
import { getToken } from '~processes/redux/slices/authSlice'
import { useAppDispatch } from '~processes/redux/store'
import CompanyLogo from '~shared/assets/logo.png'
import { RoutePath } from '~shared/config/route-config'
import { useTranslation } from 'react-i18next';

export const Auth = () => {
  const dispatch = useAppDispatch()
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation();


  useEffect(() => {
    if (token) {
      navigate(RoutePath.monitoring)
    }
  }, [token])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(getToken({ data: { username, password }, t })); // Используем await для обработки промиса
      setError(null); // Сбрасываем ошибку при успешной аутентификации
    } catch (error) {
      setError(t('Ошибка сервера.')); // Устанавливаем сообщение об ошибке с переводом
    }
  };

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
          placeholder={t('логин')}
        />
        <input
          className='input'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('пароль')}
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
