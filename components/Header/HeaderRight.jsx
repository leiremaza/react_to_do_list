import React from 'react'
import styles from './HeaderRight.module.scss'

import { users } from  './../../models/users'
import MyButton from '../Dsys/MyButton'
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useState } from 'react'
import FormCardPopAddUsers from "../Card/FormCardPopAddUsers"
const HeaderRight = () => {
    const masterUsers = users.filter((user) => user.is_master);


    return (
        <div className={styles.header_right}>
            <h4 className={styles.text}>Assigned By:</h4>
            <div className={styles.asigned_users}>
                <div className={styles.users}>
                {
                    masterUsers.map((user, i_) => (
                        <div className={styles.user} key={i_}>
                            <img src={user.pic} alt={user.name} className={styles.user_img}/>
                        </div>
                    ))
                }
                </div>
                <MyButton theme="secondary" content="icon">
                    <AddRoundedIcon className={styles.icon}/>
                </MyButton>
                
            </div>
        </div>
    )
}

export default HeaderRight
