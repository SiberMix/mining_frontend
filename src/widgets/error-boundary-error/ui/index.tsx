import './index.scss'

import { Divider } from 'antd'

import { StyledButton } from '~shared/ui/styled-button'
import { StyledCollapse } from '~shared/ui/styled-collapse'
import { SETTINGS_OPTIONS_STORE_KEY } from '~widgets/settings/consts'

const ErrorBoundaryError = () => {
  const reloadPage = () => {
    window.location.reload()
  }

  const resetLocalStorageSettings = () => {
    localStorage.removeItem(SETTINGS_OPTIONS_STORE_KEY)
    reloadPage()
  }

  return (
    <div className='error-boundary-error'>
      <div className='error-boundary-error-content'>
        <Divider
          className='error-boundary-error-main-title'
          orientation='center'>
          В приложении произошла ошибка
        </Divider>
        <StyledButton
          className='error-boundary-error-main-btn'
          width='auto'
          height='auto'
          onClick={reloadPage} >
          Перезагрузить страницу
        </StyledButton>
        <StyledCollapse
          className='error-boundary-error-collapse'
          size='large'
          items={[{
            key: '1',
            label: 'Если произошла ошибка в настройках',
            children: <StyledButton
              // width='auto'
              // height='auto'
              onClick={resetLocalStorageSettings} >
              Очистить настройки
            </StyledButton>
          }]}
        />
      </div>
    </div>
  )
}

export default ErrorBoundaryError
