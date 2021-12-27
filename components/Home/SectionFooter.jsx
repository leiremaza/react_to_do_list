import React from 'react'
import MyButton from '../Dsys/MyButton'
import styles from "./SectionFooter.module.scss"
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const SectionFooter = () => {
    return (
        <footer className={styles.section_footer}>
            <MyButton theme="secondary" content="icon">
                <AddRoundedIcon className={styles.icon}/>
            </MyButton>
            <h3 className={styles.text}>Add another card</h3>
        </footer>
    )
}

export default SectionFooter
