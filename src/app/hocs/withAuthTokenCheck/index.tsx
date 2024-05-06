import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getTokenSelector } from '~processes/redux/selectors/authSelectors'
import { setToken } from '~processes/redux/slices/authSlice'
import { useAppDispatch } from '~processes/redux/store'
import { RoutePath } from '~shared/config/route-config'

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
  }, [token, dispatch, navigate])

  return token ? element : null
}
