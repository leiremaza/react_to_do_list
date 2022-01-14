import '../styles/globals.css'
import TasksContextProvider from '../contexts/TasksContext'

function MyApp({ Component, pageProps }) {
  return (
    <TasksContextProvider>
      <Component {...pageProps} />
    </TasksContextProvider>
  )
}

export default MyApp