import React, { useContext } from 'react'
import styles from "./SectionHeader.module.scss"

import { TasksContext } from '../../contexts/TasksContext';
import MyButton from '../Dsys/MyButton';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import MoreHoriRoundedIcon from '@material-ui/icons/MoreHoriz';

const SectionHeader = ({ index }) => {

    const { tasks, sections, categories } = useContext(TasksContext);

    const section = sections[index];
    const category = categories[section.category];

    return (
        <div className={styles.section_header}>
            <div className={styles.section_title}>
                <h3 className={styles.text}>{section.title}:</h3>
                <div className={styles.progress_bar} style={{background: `${category.color}`}}/>
            </div>
            <div className={styles.section_ctas}>
                <MyButton theme="default" content="icon">
                    <AddRoundedIcon className={styles.my_button} />
                </MyButton>
                <MyButton theme="default" content="icon">
                    <MoreHoriRoundedIcon className={styles.my_button} />
                </MyButton>
            </div>
        </div>
    )
}

export default SectionHeader
