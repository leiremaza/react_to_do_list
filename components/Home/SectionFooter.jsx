import React, { useContext } from 'react'
import MyButton from '../Dsys/MyButton'
import styles from "./SectionFooter.module.scss"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { TasksContext } from '../../contexts/TasksContext';
import Link from 'next/link';

const SectionFooter = ({ index }) => {

    const { addTask } = useContext(TasksContext);

    const newTask = {
        title: "Title",
        description: "",
        users: [],
        categories: [],
        attachments: [],
        comments: [],
        pic: "",
        section: index
    }

    return (
        <footer className={styles.section_footer}>
                <MyButton theme="secondary" content="icon" onClick={() => addTask(newTask)}>
                    <AddRoundedIcon className={styles.icon} />
                </MyButton>
            <h3 className={styles.text}>Add another card</h3>
        </footer>
    )
}

export default SectionFooter
