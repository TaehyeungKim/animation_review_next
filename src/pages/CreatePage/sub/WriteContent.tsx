import { useRef, useEffect } from 'react';
import styles from './WriteContent.module.scss'
import {imageAdd} from '../../../icons/icons'
import ButtonComponent from '../../../components/Global/ButtonComponent';

function WriteContent() {

    const imageInp = useRef<HTMLInputElement>(null)
    const contentArea = useRef<HTMLElement>(null);


    const preventKeyEventDefault = (e: KeyboardEvent) => {
        
        const selection = document.getSelection() as Selection
        const anchor = selection.anchorNode as Node;
            switch(e.key) {
                case "Backspace":
                    if(anchor.textContent === '') {
                        e.preventDefault();
                        if(anchor !== contentArea.current?.firstChild) 
                        {
                        anchor.previousSibling?.hasChildNodes() && Object.getPrototypeOf(anchor.previousSibling?.firstChild).toString() === '[object Text]' ? 
                        (()=>{
                            console.log(Object.getPrototypeOf(anchor.previousSibling?.firstChild))
                            const text = anchor.previousSibling?.firstChild as Node
                            const textContent = text.textContent as string
                            selection.setBaseAndExtent(text, textContent.length, anchor.previousSibling?.firstChild as Node, 0);
                            selection.collapseToEnd();

                        })()
                        :
                        (()=>{
                            selection.setBaseAndExtent(anchor.previousSibling as Node, 0, anchor.previousSibling as Node, 0);    
                        })()
                        contentArea.current?.removeChild(anchor);
                        }
                    }
                    break;
                case "Enter":
                    e.preventDefault();
                    const addedLine = document.createElement('p');
                    addedLine.setAttribute('class', `${styles.line}`);
                    addedLine.setAttribute('style', `height: ${document.getElementById('firstline')?.offsetHeight as number / 16}rem`)
                    Object.getPrototypeOf(anchor).toString() === '[object Text]' ? 
                    (()=>{
                        contentArea.current?.insertBefore(addedLine, anchor.parentNode?.nextSibling as Node);
                        selection.setBaseAndExtent(anchor.parentNode?.nextSibling as Node, 0, anchor.parentNode?.nextSibling as Node, 0)
                    })()
                    :
                    (()=>{
                        contentArea.current?.insertBefore(addedLine, anchor.nextSibling);
                        selection.setBaseAndExtent(anchor.nextSibling as Node, 0, anchor.nextSibling as Node, 0);
                    })()
                    
                    break;
            }
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
    }
	
	const isContainingClass = (anchor: HTMLElement, className: string) => {
			try {
				return anchor.classList.contains(className)
			} catch(e) {
				return false;
			}
		}
	
	const toggleImageHighlight = (isContainingClass: (anchor: HTMLElement, className:string)=>boolean) => {
		const anchor = document.getSelection()?.anchorNode as HTMLElement
        if(isContainingClass(anchor, styles.imageContainer))  anchor?.classList.add(`${styles['imageContainer--highlight']}`)
        else {
            const highlighted = document.getElementsByClassName(`${styles['imageContainer--highlight']}`)[0]
            if(highlighted) highlighted.classList.toggle(`${styles['imageContainer--highlight']}`) 
        }
	}
	
	// const skipEnterOnImage = (isContainingClass: (anchor: HTMLElement, className:string)=>boolean, currentSelection: Selection) => {
	// 	if(currentSelection) {
	// 		if(isContainingClass(currentSelection.anchorNode as HTMLElement, styles.imageContainer)) {
	// 			const lineRef = document.getElementsByClassName(`${styles.line}`)[0] as HTMLElement
	// 			const nlHeight = lineRef.offsetHeight / 16
    //     		const newline = document.createElement('p'); newline.setAttribute('style', `height: ${nlHeight}rem`); newline.setAttribute('class', `${styles.line}`)
	// 			const contentArea = currentSelection.anchorNode.parentNode as Node
	// 			currentSelection.anchorNode.parentNode.appendChild(newline);
	// 			const nextSibling = currentSelection.anchorNode?.nextSibling as Node;
	// 			currentSelection.setBaseAndExtent(nextSibling, 0, nextSibling,0);
				
	// 		}
	// 	}
	// }
	


    document.addEventListener('selectionchange', ()=> toggleImageHighlight(isContainingClass))

    useEffect(()=>{
        contentArea.current?.addEventListener('keydown', preventKeyEventDefault);
    },[])
	// document.addEventListener('keydown', (e:any)=>{
	// 	if(e.key === 'Enter') {
	// 		skipEnterOnImage(isContainingClass, document.getSelection() as Selection);
	// 		console.log(document.getSelection()?.anchorNode?.previousSibling)
	// 		//contentArea.current?.removeChild(document.getSelection()?.anchorNode?.previousSibling as Node)
			
	// 	}
	// })
	

    return(
        <main className={styles.write}>
            <section className={styles['write--content']} contentEditable='true' onFocus={(e:any)=>{
                e.target?.firstChild.classList.add(`${styles['line--noplaceholder']}`)
            }} onBlur={(e:any)=>{
                checkIfOnlyOneLine(e)
            }} ref={contentArea}>
                <p className={styles.line} id={'firstline'}></p>
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