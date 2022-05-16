import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { App } from './App'
import { store } from './services/store'
import { theme } from './styles/theme'
import { worker } from './mocks/browser'

// if (process.env.NODE_ENV === 'development') {
//   makeServer()
// }

worker.start().then(() =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </React.StrictMode>,
  ),
)
