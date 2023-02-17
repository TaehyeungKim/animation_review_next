import { useRef, useEffect } from 'react';
import styles from './WriteContent.module.scss'
import {imageAdd} from '../../../icons/icons'
import ButtonComponent from '../../../components/Global/ButtonComponent';

function WriteContent() {
    const firstline = document.createElement('p');
    firstline.setAttribute('class', `${styles.line} ${styles['line--noplaceholder']}`)

    const imageInp = useRef<HTMLInputElement>(null)
    const contentArea = useRef<HTMLElement>(null);
    const firstlineRef = useRef<HTMLParagraphElement>(null);
 
    const checkIsEmpty = (e:any)=>{
        if(e.target?.childNodes.length === 0) e.target?.appendChild(firstline);
    }

    const checkIfOnlyOneLine = (e:any) => {
        if(e.target?.childNodes.length === 1) e.target?.firstChild.textContent === '' ? 
        e.target?.firstChild.classList.remove(`${styles['line--noplaceholder']}`) : e.target?.firstChild.classList.add(`${styles['line--noplaceholder']}`)       
    }

    const insertImageToContent = (e:any) => {
        const tempURL = URL.createObjectURL(e.target?.files[0]);
        const currentCaret = window.getSelection()?.anchorNode;
        const imageContainer = document.createElement('div'); imageContainer.setAttribute('class', `${styles.imageContainer}`);
        const image = document.createElement('img'); image.setAttribute('src', tempURL);
        imageContainer.appendChild(image);
        contentArea.current?.insertBefore(imageContainer, currentCaret?.nextSibling as Node);

        const flheight = firstlineRef.current?.offsetHeight;
        
        const newline = document.createElement('p'); newline.setAttribute('style', `height: ${flheight as number/16}rem`); newline.setAttribute('class', `${styles.line}`)
        contentArea.current?.appendChild(newline);
    }

    document.addEventListener('selectionchange', ()=>{
        const anchor = document.getSelection()?.anchorNode as HTMLElement
        if(anchor?.classList.contains(styles.imageContainer))  anchor?.classList.add(`${styles['imageContainer--highlight']}`)
        else {
            const highlighted = document.getElementsByClassName(`${styles['imageContainer--highlight']}`)[0]
            if(highlighted) highlighted.classList.toggle(`${styles['imageContainer--highlight']}`) 
        }
    })


    return(
        <main className={styles.write}>
            <section className={styles['write--content']} contentEditable='true' onFocus={(e:any)=>{
                e.target?.firstChild.classList.add(`${styles['line--noplaceholder']}`)
            }} onInput={(e:any)=>{
                checkIsEmpty(e);
            }} onBlur={(e:any)=>{
                checkIfOnlyOneLine(e)
            }} ref={contentArea}>
                <p className={styles.line} ref={firstlineRef}></p>
            </section>
            <aside className={styles['write--optionbar']}>
                <ButtonComponent className={styles['write--optionbar--button']} children={imageAdd()} event={[['onClick', ()=> {
                    try{imageInp.current?.click()} catch(e) {console.log(e)}
                }]]}/>
                <input type='file' accept="image/*" hidden ref={imageInp} onChange={insertImageToContent}/>
            </aside>
        </main>
    )
}

export default WriteContent;