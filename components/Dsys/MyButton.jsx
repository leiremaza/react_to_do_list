import React from 'react'
import styles from './MyButton.module.scss'

const MyButton = React.forwardRef(({onClick, href, ...props}, ref) => {

   const buttonClass = [
        styles["button-" + props.content], 
        styles["button-" + props.theme]
    ]

    return (
        <button href={href} onClick={onClick} ref={ref} className={buttonClass.join(" ")}>
            {props.children}
        </button>
    )
})


export default MyButton
