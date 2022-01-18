import React, { useContext } from 'react'
import MyButton from '../Dsys/MyButton'
import styles from "./SectionFooter.module.scss"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { TasksContext } from '../../contexts/TasksContext';

const SectionFooter = () => {

    const { addTask } = useContext(TasksContext);

    return (
        <footer className={styles.section_footer}>
            <button onClick={(e) => {e.stopPropagation(); addTask("Hola")}}>+</button>
            <MyButton theme="secondary" content="icon">
                <AddRoundedIcon className={styles.icon}/>
            </MyButton>
            <h3 className={styles.text}>Add another card</h3>
        </footer>
    )
}

export default SectionFooter
