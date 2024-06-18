import './index.scss'

import { StyledButton } from '~shared/ui/styled-button'

const ErrorBoundaryError = () => {
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className='error-boundary-error'>
      <h1 className='error-boundary-error-title'>
        В приложении произошла ошибка
      </h1>
      <StyledButton
        width='auto'
        height='auto'
        onClick={reloadPage} >
        Перезагрузить страницу
      </StyledButton>
    </div>
  )
}

export default ErrorBoundaryError
