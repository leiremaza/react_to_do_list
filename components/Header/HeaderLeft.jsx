import React from 'react'
import Link from 'next/link';
import styles from './HeaderLeft.module.scss'
import StarRoundedIcon from '@material-ui/icons/StarRounded';

const HeaderLeft = () => {
    return (
        <Link href="/">
            <a className={styles.header_left}>
                <StarRoundedIcon className={styles.logo} />
                <h1 className={styles.name}>UX Team</h1>
            </a>
        </Link>
    )
}

export default HeaderLeft
