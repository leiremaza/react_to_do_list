import styles from '../styles/Home.module.scss'

import TasksContextProvider from '../contexts/TasksContext'
import HeaderLeft from "../components/Header/HeaderLeft"
import HeaderRight from "../components/Header/HeaderRight"
import Home from "../components/Home/Home"
import { useEffect, useState } from 'react'

const index = () => {

  const [winReady, setwinReady] = useState(false);
    useEffect(() => {
        setwinReady(true);
    }, []);

  return (
    <div>
    {
      winReady ?
          (
            <div className={styles.app}>
              <header className={styles.header}>
                <HeaderLeft />
                <HeaderRight />
              </header>
              <main className={styles.content}>
                <Home />
              </main>
            </div>
          ) : null
    }
    </div>
  )
}

export default index