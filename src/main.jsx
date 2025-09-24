import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './context/StoreContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { OrdersProvider } from './context/OrdersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <OrdersProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </OrdersProvider>
    </StoreProvider>
  </StrictMode>,
)
