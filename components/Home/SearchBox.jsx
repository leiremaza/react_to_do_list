import React from 'react'
import styles from './SearchBox.module.scss'

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import MyButton from '../Dsys/MyButton';

const SearchBox = () => {
    return (
        <nav className={styles.searchbox}>
            <form className={styles.form}>
                <div className={styles.searchbox_icon}>
                    <SearchRoundedIcon className={styles.icon} />
                </div>
                <div className={styles.searchbox_input}>
                    <input type="text" className={styles.input_control} placeholder="Search..." />
                </div>
            </form>
            <div className={styles.ctas}>
                <MyButton theme="secondary" content="text" /*onClick={addNewGroup}*/>
                    <h4 className={styles.text}>New</h4>
                </MyButton>
                <MyButton theme="secondary" content="text">
                    <h4 className={styles.text}>Filter</h4>
                </MyButton>
                <div className={styles.sort_by}>
                    <h4 className={styles.name}>Sort by:</h4>
                    <select className={styles.select}>
                        <option className={styles.option} value="data_asc">Date ascendent</option>
                        <option className={styles.option} value="data_desc">Date descendent</option>
                        <option className={styles.option} value="name_asc">Name A-Z</option>
                        <option className={styles.option} value="name_desc">Name Z-A</option>
                        <option className={styles.option} value="relevance">Relevance</option>
                    </select>
                </div>
            </div>
        </nav>
    )
}

export default SearchBox
