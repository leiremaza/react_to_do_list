import React from 'react'
import styles from './MyButton.module.scss'

const MyButton = (props) => {

   const buttonClass = [
        styles["button-" + props.content], 
        styles["button-" + props.theme]
    ]

    return (
        <button className={buttonClass.join(" ")}>
            {props.children}
        </button>
    )
}

export default MyButton
