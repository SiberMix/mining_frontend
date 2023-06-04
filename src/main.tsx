import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as JotaiProvider } from 'jotai' //FIXME удалить после переноса атома в редакс
import { store } from './redux/store'

const rootElement = document.getElementById('root')
render(
  <StrictMode>
    <ReduxProvider store={store}>
      <JotaiProvider>
        {' '}
        {/*FIXME удалить после переноса атома в редакс*/}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </JotaiProvider>
    </ReduxProvider>
  </StrictMode>,
  rootElement
)
