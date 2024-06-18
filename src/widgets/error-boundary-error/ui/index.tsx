import './index.scss'

import { StyledButton } from '~shared/ui/styled-button'

const ErrorBoundaryError = () => {
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className='error-boundary-error'>
      <h1>
        В приложении произошла ошибка
      </h1>
      <StyledButton onClick={reloadPage} >
        Перезагрузить страницу
      </StyledButton>
    </div>
  )
}

export default ErrorBoundaryError
