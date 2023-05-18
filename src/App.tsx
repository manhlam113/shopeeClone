import { useContext, useEffect } from 'react'
import useRouteElement from './utils/useRouteElement'
import { ToastContainer } from 'react-toastify'
import { LocalStorageEventTarget } from './utils/utils.auth'
import { AppContext } from './context/authenticated.context'

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
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
