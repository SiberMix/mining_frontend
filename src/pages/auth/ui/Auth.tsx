import './Auth.scss'

import type { FormEvent } from 'react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getTokenSelector } from '~processes/redux/selectors/authSelectors'
import { getToken } from '~processes/redux/slices/authSlice'
import { useAppDispatch } from '~processes/redux/store'
import CompanyLogo from '~shared/assets/smartops.jpeg'
import { RoutePath } from '~shared/config/route-config'

export const Auth = () => {
  const dispatch = useAppDispatch()
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { t } = useTranslation()
  const [isBannerVisible, setIsBannerVisible] = useState(true) // Состояние для управления видимостью плашки

  useEffect(() => {
    if (token) {
      navigate(RoutePath.monitoring)
    }
  }, [token])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await dispatch(getToken({ data: { username, password }, t })) // Используем await для обработки промиса
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(null) // Сбрасываем ошибку при успешной аутентификации
    } catch (error) {
      setError(t('Ошибка сервера.')) // Устанавливаем сообщение об ошибке с переводом
    }
  }

  const handleCloseBanner = () => {
    setIsBannerVisible(false) // Закрыть плашку
  }

  return (
    <div className='root'>
      <div className='logo-container'>
        <img
          className='logo'
          id='displayed'
          alt='logo'
          src={CompanyLogo}
        />
      </div>

      {/* Уведомление с тестовыми данными, если оно не закрыто */}
      {isBannerVisible
        ? <div className='info-banner'>
          <button
            className='close-button'
            onClick={handleCloseBanner}>
            ×
          </button>
          <p>
            {t('Тестовые данные для входа:')}
          </p>
          <p>
            {t('Логин: testuser')}
          </p>
          <p>
            {t('Пароль: testpassword')}
          </p>
        </div>
        : null}

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
          {' '}
          {/* Стрелочка для кнопки */}
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
