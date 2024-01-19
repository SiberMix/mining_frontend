import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RoutePath } from '~shared/config/route-config'

import { getTokenSelector } from '../../../../srcOld/redux/selectors/authSelectors'
import { setToken } from '../../../../srcOld/redux/slices/authSlice'
import { useAppDispatch } from '../../../../srcOld/redux/store'

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
