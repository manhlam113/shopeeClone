import { useContext, useEffect } from 'react'
import useRouteElement from './utils/useRouteElement'
import { ToastContainer } from 'react-toastify'
import { LocalStorageEventTarget } from './utils/utils.auth'
import { AppContext, AuthenticatedProvider } from './context/authenticated.context'
import './i18n'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  const routeElement = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      reset()
    })
  }, [reset])
  return (
    <div>
      <HelmetProvider>
        <AuthenticatedProvider>
          {routeElement}
          <ToastContainer />
        </AuthenticatedProvider>
      </HelmetProvider>
    </div>
  )
}

export default App
