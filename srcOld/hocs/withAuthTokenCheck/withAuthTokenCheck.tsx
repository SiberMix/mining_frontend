import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RoutePath } from '~shared/config/route-config'

import { getTokenSelector } from '../../redux/selectors/authSelectors'
import { setToken } from '../../redux/slices/authSlice'
import { useAppDispatch } from '../../redux/store'

type WithAuthCheckProps = {
  element: ReactNode
}

export const WithAuthCheck = ({ element }: WithAuthCheckProps) => {
  const dispatch = useAppDispatch()
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate(RoutePath.auth)
      dispatch(setToken(null))
      localStorage.removeItem('token')
    }
  }, [token])

  return token ? element : null
}
