import React from 'react';
import styles from './Loading.module.scss';
import loading from '@/public/logo192.png'

function Loading() {
    return(
    <div className={styles.loading}>
            <div className={styles.loading_wrapper}>
                <img className={styles['loading_image']} src={'/logo192.png'}></img>
            </div>
        </div>
    )
}

export default Loading;