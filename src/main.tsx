import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthenticatedProvider } from './context/authenticated.context'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthenticatedProvider>
          <App />
        </AuthenticatedProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
