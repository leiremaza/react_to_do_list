import React from 'react'
import styles from "./FormCardPopAddCategories.module.scss"
import { categories as categories_ } from '../../models/categories'


const FormCardPopAddCategories = () => {
    return (
        <div className={styles.pop_add_categories}>
            
            <div className={styles.add_categories_search}>
                <input className={styles.input_search} type="text" name="newUser" placeholder="Search a new category..." />
            </div>
            <div className={styles.add_categories}>
                {categories_.map((cat,i_) => (
                    <div className={styles.cat} key={i_}>
                        <div className={styles.cat_color} style={{ backgroundColor: cat.color}}>
                        
                        </div>
                        <h4 className={styles.name}>
                            {cat.name}
                        </h4>
                    </div>
                ))}    
                    
            </div>
        </div>
    )
}

export default FormCardPopAddCategories

