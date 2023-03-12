import { useRef, useEffect } from 'react';
import styles from './WriteContent.module.scss'
import WriteContentAside from './WriteContentAside';


function WriteContent() {

    
    const contentArea = useRef<HTMLElement>(null);

    const asideStyle = {imageContainer: styles.imageContainer}

    const paragraphMaker = () => {
        const addedLine = document.createElement('p');
        const breakingLine = document.createElement('br');
        addedLine.setAttribute('class', `${styles.line}`);
        addedLine.appendChild(breakingLine);
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
            (()=>{if(contentArea.current?.childElementCount === 1) addPlaceHolder(detectFirstLine() as HTMLElement)})()

        }
    }
    //------------------------------related to first line placeholder----------------------------------//


    const preventKeyEventDefault = (e: KeyboardEvent) => {
        
        const selection = document.getSelection() as Selection
        const anchor = selection.anchorNode as Node
            switch(e.key) {
                case "Backspace":

                    //when the paragraph line is blank//
                    if(anchor.nodeName === 'P') {
                        const firstP = detectFirstLine();
                        if(anchor === firstP && anchor.textContent === '' && contentArea.current?.childElementCount === 1) {
                            e.preventDefault();
                        }
                    }

                    //when the paragraph line has some content
                    else if(anchor.nodeName === '#text') {
                        const previousSibling = anchor.parentNode?.previousSibling
                        if(anchor.textContent !== '' && previousSibling?.nodeName === 'DIV') {
                            e.preventDefault();
                            selection.setBaseAndExtent(previousSibling, 0, previousSibling, 0);
                        }
                    }
                    //when the current selection is image
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

                        const aside = document.getElementById('aside')
                        const anchorAlias = anchor as Element;
                        const boundInp = aside?.getElementsByClassName('imageInp').namedItem(`${anchorAlias.getAttribute('key')}`) as Node;
                        aside?.removeChild(boundInp);

                    }
                    break;
                

                case "Enter":
                    const anc = anchor.nodeName === '#text' ? anchor.parentNode : anchor
                    const addedLine = paragraphMaker();
                    if(anc === contentArea.current?.firstElementChild && anc?.nodeName !== "DIV") {
                        e.preventDefault();   
                        contentArea.current?.insertBefore(addedLine, anc?.nextSibling as Node);
                        const [former, latter] = [
                        document.createTextNode(anc?.textContent?.slice(0,selection.anchorOffset) as string), 
                        document.createTextNode(anc?.textContent?.slice(selection.anchorOffset) as string)]
                        selection.setBaseAndExtent(anc?.nextSibling as Node, 0, anc?.nextSibling as Node, 0)
                        if(anc?.firstChild) anc?.replaceChild(former, anc.firstChild as Node);
                        selection.anchorNode?.appendChild(latter);
                    } else if(anc?.nodeName === "DIV") {
                        e.preventDefault();
                        contentArea.current?.insertBefore(addedLine, anc?.nextSibling as Node)
                        selection.setBaseAndExtent(anc?.nextSibling as Node, 0, anc?.nextSibling as Node, 0)
                    }
                    
                    break;
            }
    }

    
	
	
	const toggleImageHighlight = () => {
        const isContainingClass = (anchor: HTMLElement, className: string) => {
			try {
				return anchor.classList.contains(className)
			} catch(e) {
				return false;
			}
		}
	
		const anchor = document.getSelection()?.anchorNode as HTMLElement
        const highlighted = document.getElementsByClassName(`${styles['imageContainer--highlight']}`)
        if(highlighted) for(let i =0; i < highlighted.length; i++) highlighted[i].classList.toggle(`${styles['imageContainer--highlight']}`) 
        if(isContainingClass(anchor, styles.imageContainer))  anchor?.classList.add(`${styles['imageContainer--highlight']}`)
	}
		

    

    useEffect(()=>{
        contentArea.current?.addEventListener('keydown', preventKeyEventDefault);
        return(()=>{contentArea.current?.removeEventListener('keydown', preventKeyEventDefault)})
    },[])

    useEffect(()=>{
        document.addEventListener('selectionchange', toggleImageHighlight)
        document.addEventListener('selectionchange', toggleFirstLinePlaceHolder)
        return(()=>{
            document.removeEventListener('selectionchange', toggleImageHighlight)
            document.removeEventListener('selectionchange', toggleFirstLinePlaceHolder)
        })
    },[])
	

    return(
        <main className={styles.write}>
            <section className={styles['write--content']} contentEditable='true' ref={contentArea} id={'contentArea'}>
                <p className={styles.line} id={'firstline'}></p>
            </section>
            <WriteContentAside style={asideStyle}/>
        </main>
    )
}

export default WriteContent;