import '@babel/polyfill'
import React from 'react'
import { render, } from 'react-dom'
import { createStore, } from 'redux'
import { Provider, } from 'react-redux'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import todoApp from './reducers'

const store = createStore(todoApp)

// TODO: example https://codepen.io/handsoncode/pen/LWmvPX?editors=0010

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
