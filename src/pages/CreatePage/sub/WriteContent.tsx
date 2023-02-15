import React, {useState, useEffect, useRef} from 'react';
import styles from './WriteContent.module.scss'

function WriteContent() {
    const firstline = document.createElement('p');
    firstline.setAttribute('class', `${styles.line} ${styles['line--focused']}`)
 
    const checkIsEmpty = (e:any)=>{
        if(e.target?.childNodes.length === 0) e.target?.appendChild(firstline);
    }

    const checkIfOnlyOneLine = (e:any) => {
        if(e.target?.childNodes.length === 1 && e.target?.firstChild.textContent === '') e.target?.firstChild.classList.remove(`${styles['line--focused']}`)
    }


    return(
        <section className={styles.write} contentEditable='true' onFocus={(e:any)=>{
            e.target?.firstChild.classList.add(`${styles['line--focused']}`)
        }} onInput={(e:any)=>{
            checkIsEmpty(e);
        }} onBlur={(e:any)=>{
            checkIfOnlyOneLine(e)
        }}>
            <p className={styles.line}></p>
        </section>
    )
}

export default WriteContent;