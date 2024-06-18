import type { ErrorInfo, ReactNode } from 'react'
import React, { Suspense } from 'react'

import { ErrorBoundaryError } from '~widgets/error-boundary-error'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Обновляем состояние, чтобы следующий рендер показал запасной UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (<Suspense fallback={<div>
        Loading...
      </div>}
      >
        <ErrorBoundaryError />
      </Suspense>)
    }

    return this.props.children
  }
}
