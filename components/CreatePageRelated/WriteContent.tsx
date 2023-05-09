import React, { useRef, useEffect } from 'react';
import styles from './WriteContent.module.scss'
import WriteContentAside from './WriteContentAside';
import {EditableP} from './EditableElements/EditableP/EditableP';

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
            } 
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
                        if(anchor === firstP && anchor.textContent === '' && contentArea.current?.childElementCount === 1) e.preventDefault();   
                    }

                    //when the paragraph line has some content
                    else if(anchor.nodeName === '#text') {
                        const previousSibling = anchor.parentNode?.previousSibling
                        if(anchor.textContent === '' && previousSibling?.nodeName === 'DIV') {
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
                    {const anc = anchor.nodeName === '#text' ? anchor.parentNode : anchor
                    const addedLine = paragraphMaker();
                     if(anc?.nodeName === "DIV") {
                        e.preventDefault();
                        contentArea.current?.insertBefore(addedLine, anc?.nextSibling as Node)
                        selection.setBaseAndExtent(anc?.nextSibling as Node, 0, anc?.nextSibling as Node, 0)
                    }
                    
                    break;
                    }
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

    const preventPastingStyle = (e: ClipboardEvent) => {
        e.preventDefault();
        const selection = document.getSelection();
        const text = e.clipboardData?.getData('text/plain');
        if(!selection?.rangeCount) return ;
        else {
            const { startContainer, startOffset } = selection.getRangeAt(0);
            const [former, latter] = [startContainer.textContent?.slice(0,startOffset) as string, startContainer.textContent?.slice(startOffset)];
            startContainer.textContent = former + text + latter;
            const range = new Range();
            if(startContainer.nodeName === 'P') range.setEnd(startContainer.lastChild as Node, text?.length as number);
            else range.setEnd(startContainer, startOffset + (text?.length as number - 1));
            selection.removeAllRanges();
            selection.addRange(range);
            selection.collapseToEnd();
        }
        
    }

    const changeSelectionToImage = () => {
        const selection = document.getSelection() as Selection
        const {focusNode} = selection
        if(focusNode?.nodeName === 'DIV') selection.setBaseAndExtent(focusNode, 0, focusNode, 0)
        
    }
		
    useEffect(()=>{
        contentArea.current?.addEventListener('paste', preventPastingStyle)
    },[])

    

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

    useEffect(()=>{
        document.addEventListener('mouseup', changeSelectionToImage);
    },[])


    return(
        <main className={styles.write}>
            <section className={styles['write--content']} contentEditable='true' suppressContentEditableWarning ref={contentArea} id={'contentArea'}>
                <EditableP className={styles.line}/>
            </section>
            <WriteContentAside style={asideStyle} paragraphMaker={paragraphMaker}/>
        </main>
    )
}

export default WriteContent;