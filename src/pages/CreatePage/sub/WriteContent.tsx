import React, {useState, useRef} from 'react';
import styles from './WriteContent.module.scss'

function WriteContent() {
    const currentline = React.createElement('p', {
        className: styles.line,
        autoFocus: 'true'
    })


    return(
        <section className={styles.write} contentEditable='true'>
            {currentline}
        </section>
    )
}

export default WriteContent;