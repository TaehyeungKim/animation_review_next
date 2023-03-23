import { useState, useEffect } from "react";
import TextEditPalette from './TextEditPalette'
import {SpanStyle} from './InterFaceModule'



interface EditableContentElements {
    className: string,
    id?: string
}

interface EditablePprops extends EditableContentElements {

}

function EditableP({className}:EditablePprops) {
    const [paletteVisible, setPaletteVisible] = useState<boolean>(false);
    const [rangeDomRect, setRangeDomRect] = useState<DOMRect>();

    const selection = document.getSelection() as Selection;

    const pCollection = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLParagraphElement>;
    

    const updatePaletteVisible = () => { 
        if(!selection.getRangeAt(0).collapsed) setPaletteVisible(true);
        else setPaletteVisible(false);
    }


    const customizeLetter = (style: SpanStyle, line: Node, selection: Selection) => {

        const {anchorNode, focusNode, anchorOffset, focusOffset} = selection 
        if(anchorNode?.nodeName !== '#text' || focusNode?.nodeName !== '#text') return ;

        const range = new Range();


        const setRangeStartAndEnd = (firstNode: Node, secondNode: Node, firstOffset: number, secondOffset: number, range: Range) => {
            try {
                range.setStart(firstNode, firstOffset);
                range.setEnd(secondNode, secondOffset);
                if(range.toString()==="") throw new Error("firstNode is latter than the secondNode");
            } catch(e) {
                range.setStart(secondNode, secondOffset);
                range.setEnd(firstNode, firstOffset);
            }
            
        }


        if(line.contains(anchorNode) && line.contains(focusNode)) setRangeStartAndEnd(anchorNode, focusNode, anchorOffset, focusOffset, range);
        else if(!line.contains(anchorNode) && !line.contains(focusNode)) setRangeStartAndEnd(line.firstChild as Node, line.lastChild as Node, 0, line.lastChild?.textContent?.length as number, range);
        else {
            let [markerNode, markerNodeOffset] = line.contains(anchorNode) ? [anchorNode, anchorOffset] : [focusNode, focusOffset];     
            if(line.nextSibling?.nodeName === 'P' && selection.containsNode(line.nextSibling as Node, true)) setRangeStartAndEnd(markerNode, line.lastChild as Node, markerNodeOffset, line.lastChild?.textContent?.length as number, range)
            else setRangeStartAndEnd(line.firstChild as Node, markerNode, 0, markerNodeOffset, range);
        }

        selection.addRange(range)

        const arr: Node[] = []

        const searchTextNode = (node: Node, status: string, firstBranch=true) => {
            if(!node || !selection.containsNode(node, true)) return ;
            if(node.nodeName === '#text') {
                if(node.textContent !== "")  {
                    arr.push(node)
                }
            } 
            else {
                if(status !== 'up') searchTextNode(node.childNodes[0], 'down', false)
            }

            if(node.nextSibling === null) {
                if(firstBranch)searchTextNode(node.parentNode as Node, 'up', firstBranch)
                else return ;
            }
            else searchTextNode(node.nextSibling, 'right', firstBranch)
        }

        const [start, end, startOffset, endOffset] = [range.startContainer, range.endContainer, range.startOffset, range.endOffset]

        searchTextNode(start, 'right');


        arr.forEach((node: Node, index: number, array: Node[])=>{
            if(array.length === 1) {
                range.setStart(node, startOffset);
                range.setEnd(node, endOffset);
            } else {
                switch(index) {
                    case 0:
                        range.setStart(node, startOffset); range.setEnd(node, node.textContent?.length as number);

                        break;
                    case array.length - 1:
                        range.setStart(node, 0); 
                        range.setEnd(node, endOffset);
                        break;
                    default:
                        range.setStart(node, 0); range.setEnd(node, node.textContent?.length as number)
                }
            }
            const elm = range.extractContents();
            const span = document.createElement('span');
            span.setAttribute('style', `${style.propertyKey}: ${style.propertyValue}`);
            span.appendChild(elm);
            range.insertNode(span);
        })
    }

    const change = (selection: Selection, style: SpanStyle)=> {
        let [top, bottom] = [-1,-1]
        for(let i = 0; i < pCollection.length; i++) {
            if(selection?.containsNode(pCollection[i], true)) {
                top = i
                break;
            }
        }
        for(let j = pCollection.length - 1; j >= top; j--) {
            if(selection?.containsNode(pCollection[j], true)) {
                bottom = j
                break;
            }
        }
        for(let j = top; j <= bottom; j++) {
            customizeLetter(style, pCollection[j], selection)
        }
        selection.collapseToEnd()
        setPaletteVisible(false);
    }

    const updateRangeDomRect = () => setRangeDomRect(selection.getRangeAt(0).getBoundingClientRect());
    


    useEffect(()=>{
        document.addEventListener('selectionchange', updatePaletteVisible)
    },[])

    useEffect(()=>{
        document.addEventListener('selectionchange', updateRangeDomRect)
    },[])



    return(
        <>
        <p className={className}><br/></p>
        {paletteVisible && <TextEditPalette change={change} rangeDomRect={rangeDomRect as DOMRect}/>}
        
        </>
    )
}

export {EditableP};