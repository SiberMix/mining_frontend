import React from 'react'
import { render } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from '~app/App'
import { queryClient } from '~app/model'

import { store } from './srcOld/redux/store'

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
  rootElement
)
