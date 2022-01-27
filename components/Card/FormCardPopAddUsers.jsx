import {React, useState} from 'react'
import styles from "./FormCardPopAddUsers.module.scss"
import { users as users_ } from './../../models/users'

const FormCardPopAddUsers = ({addUser, addUsers}) => {
   
const users01 = users_.filter(x => !addUsers.includes(x)) 

    return (
        <div className={styles.pop_add_users}>
            
            <div className={styles.add_users_search}>
                <input className={styles.input_search} type="text" name="newUser" placeholder="Search a new member..." />
            </div>
            <div className={styles.add_users}>
                {users01.map((user,i_) => (
                    <div className={styles.user} key={i_} onClick={() => {addUser(user)}}>
                        <div className={styles.user_pic}>
                        <img src={user.pic} alt="" />
                        </div>
                        <h4 className={styles.name}>
                            {user.name}
                        </h4>
                    </div>
                ))}    
                    
            </div>
        </div>
    )
}

export default FormCardPopAddUsers

