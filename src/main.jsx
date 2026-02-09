// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import ScrollToTop from './components/ScrollToTop'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // </StrictMode>,
  <ProductProvider>
    <BrowserRouter>
      <ScrollToTop />
        <App />
    </BrowserRouter>
  </ProductProvider>
)
