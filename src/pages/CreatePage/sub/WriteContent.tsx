import { useRef, useEffect } from 'react';
import styles from './WriteContent.module.scss'
import {imageAdd} from '../../../icons/icons'
import ButtonComponent from '../../../components/Global/ButtonComponent';

function WriteContent() {

    const imageInp = useRef<HTMLInputElement>(null)
    const contentArea = useRef<HTMLElement>(null);

    const paragraphMaker = () => {
        const addedLine = document.createElement('p');
        addedLine.setAttribute('class', `${styles.line}`);
        addedLine.setAttribute('style', `height: ${document.getElementById('firstline')?.offsetHeight as number / 16}rem`)
        return addedLine
    }

    const detectFirstLine = () => {
        let firstP = null;
        const list = contentArea.current?.childNodes as NodeList
        for(let i = 0; i < (list.length as number); i++ ) {
            if(list[i].nodeName === 'P') {
                firstP = list[i];
                break;
            } else { }
        
        }
        return firstP
    }
    //------------------------------related to first line placeholder----------------------------------//
    const addPlaceHolder = (target: HTMLElement) => target.classList.remove(`${styles['line--noplaceholder']}`)
    const removePlaceHolder = (target: HTMLElement) => target.classList.add(`${styles['line--noplaceholder']}`)

    const toggleFirstLinePlaceHolder = () => {
        const selection = document.getSelection() as Selection;
        if(detectFirstLine()?.textContent === '') {
            selection.anchorNode === detectFirstLine() ? 
            removePlaceHolder(detectFirstLine() as HTMLElement)
            :
            (()=>{if(contentArea.current?.childElementCount === 1)addPlaceHolder(detectFirstLine() as HTMLElement)})()

        }
    }
    //------------------------------related to first line placeholder----------------------------------//


    const preventKeyEventDefault = (e: KeyboardEvent) => {
        
        const selection = document.getSelection() as Selection
        const anchor = selection.anchorNode as Node
            switch(e.key) {
                case "Backspace":
                    if(anchor.nodeName === 'P') {
                        const firstP = detectFirstLine();
                        if(anchor === firstP && anchor.textContent === '') e.preventDefault();
                    }
                    else if(anchor.nodeName === 'DIV') {
                        e.preventDefault();
                        if(contentArea.current?.firstElementChild === anchor) {
                            selection.setBaseAndExtent(anchor.nextSibling as Node, 0, anchor.nextSibling as Node, 0);
                            contentArea.current?.removeChild(anchor);


                        } else {
                            const replacingP = paragraphMaker()
                            contentArea.current?.replaceChild(replacingP, anchor);
                            selection.setBaseAndExtent(replacingP, 0, replacingP, 0);
                        }
                    }
                    break;
                case "Enter":
                    const anc = anchor.nodeName === '#text' ? anchor.parentNode : anchor
                    if(anc === contentArea.current?.firstElementChild) {
                        e.preventDefault();   
                        const addedLine = paragraphMaker();
                        contentArea.current?.insertBefore(addedLine, anc?.nextSibling as Node);
                        const [former, latter] = [
                        document.createTextNode(anc?.textContent?.slice(0,selection.anchorOffset) as string), 
                        document.createTextNode(anc?.textContent?.slice(selection.anchorOffset) as string)]
                        selection.setBaseAndExtent(anc?.nextSibling as Node, 0, anc?.nextSibling as Node, 0)
                        anc?.replaceChild(former, anc.firstChild as Node);
                        selection.anchorNode?.appendChild(latter);
                    }
                    
                    break;
            }
    }


    const insertImageToContent = (e:any) => {
        const tempURL = URL.createObjectURL(e.target?.files[0]);
        const currentCaret = window.getSelection()?.anchorNode;
        const imageContainer = document.createElement('div'); imageContainer.setAttribute('class', `${styles.imageContainer}`);
        const image = document.createElement('img'); image.setAttribute('src', tempURL);
        imageContainer.appendChild(image);
        const marker = currentCaret?.nodeName === '#text' ? currentCaret.parentNode : currentCaret as Node
        contentArea.current?.insertBefore(imageContainer, marker);
        document.getSelection()?.setBaseAndExtent(imageContainer, 0, imageContainer, 0);    
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
		

    document.addEventListener('selectionchange', ()=> toggleImageHighlight(isContainingClass))

    useEffect(()=>{
        contentArea.current?.addEventListener('keydown', preventKeyEventDefault);
    },[])

    useEffect(()=>{document.addEventListener('selectionchange', toggleFirstLinePlaceHolder)},[])
	

    return(
        <main className={styles.write}>
            <section className={styles['write--content']} contentEditable='true' ref={contentArea}>
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