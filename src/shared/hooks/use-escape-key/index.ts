import { useEffect } from 'react'

type Handler = (event: KeyboardEvent) => void;

export const useEscapeKey = (handler: Handler) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler(event)
      }
    }

    // Добавляем обработчик события keydown
    document.addEventListener('keydown', handleKeyDown)

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handler])
}
