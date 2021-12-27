import React from 'react'
import styles from "./SectionHeader.module.scss"

import { categories } from './../../models/categories'
import MyButton from '../Dsys/MyButton'
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import MoreHoriRoundedIcon from '@material-ui/icons/MoreHoriz';

const SectionHeader = (props) => {

    const category = categories.find(category => category.id == props.category);

    const progressClass = [
        category.color == "red" ? styles.red :
        category.color == "orange" ? styles.orange :        
        category.color == "green" ? styles.green :
        category.color == "blue" ? styles.blue : null,
        styles.progress_bar        
    ];

    return (
        <div className={styles.section_header}>
            <div className={styles.section_title}>
                <h3 className={styles.text}>{props.title}:</h3>
                <progress className={progressClass.join(" ")} max="100" value="80"/>
            </div>
            <div className={styles.section_ctas}>
                <MyButton theme="default" content="icon">
                    <AddRoundedIcon className={styles.my_button}/>
                </MyButton>
                <MyButton theme="default" content="icon">
                    <MoreHoriRoundedIcon className={styles.my_button}/>
                </MyButton>
            </div>
        </div>
    )
}

export default SectionHeader
