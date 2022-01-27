import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'

import { TasksContext } from '../contexts/TasksContext'
import HeaderLeft from "../components/Header/HeaderLeft"
import HeaderRight from "../components/Header/HeaderRight"
import Home from "../components/Home/Home"

const index = () => {

  const { dataLoaded } = useContext(TasksContext);
  const [winReady, setwinReady] = useState(false);
  
  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <div>
      {
        winReady & dataLoaded ?
          <div className={styles.app}>
            <header className={styles.header}>
              <HeaderLeft />
              <HeaderRight />
            </header>
            <main className={styles.content}>
              <Home />
            </main>
          </div>
          :
          <div>Loading...</div>
      }
    </div>
  )
}


export default index