import { useEffect } from "react"

interface LocalStorageEvent extends Event {
  key: string,
  newValue: string | null,
  oldValue: string | null
}

function useLocalStorageEvent(handler: (event: LocalStorageEvent) => void, eventName = "localStorageChange") {
  useEffect(() => {
    const eventHandler = (e: Event) => {
      const localStorageEvent = e as LocalStorageEvent
      if (localStorageEvent.type === eventName) {
        handler(localStorageEvent)
      }
    }

    window.addEventListener(eventName, eventHandler)

    return () => {
      window.removeEventListener(eventName, eventHandler)
    }
  }, [eventName, handler])
}

export default useLocalStorageEvent
