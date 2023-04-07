import { useState, useEffect } from "react";
import TextEditPalette from "./TextEditPalette";
import {SpanStyle, EditableContentElements} from '../InterFaceModule'
import {searchTextNode} from '../EditablContentModule'


interface EditablePprops extends EditableContentElements {
    
}

function EditableP({className}:EditablePprops) {
    const [paletteVisible, setPaletteVisible] = useState<boolean>(false);
    const [rangeDomRect, setRangeDomRect] = useState<DOMRect>();

    const [isMouseOrKeyUp, setIsMouseOrKeyUp] = useState<boolean>(true);

    const setMouseOrKeyDown = () => setIsMouseOrKeyUp(false);
    const setMouseOrKeyUp = () => setIsMouseOrKeyUp(true);

    const selection = document.getSelection() as Selection;

    const pCollection = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLParagraphElement>;

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


    const customizeLetter = (style: SpanStyle, line: Node, selection: Selection) => {

        const {anchorNode, focusNode, anchorOffset, focusOffset} = selection 
        if(anchorNode?.nodeName !== '#text' || focusNode?.nodeName !== '#text') return ;

        const range = new Range();

        const findFirstAndLastTextNode = (node: Node, first: boolean): any => {
            try {
                if(node.firstChild?.nodeName=== "BR") throw new Error("the line is blank")
                const [child, sibling] = first ? [node.firstChild, node.nextSibling] : [node.lastChild, node.previousSibling]
                if(node.nodeName === "#text") {
                    if(node.textContent !== "") return node
                    else {
                        return findFirstAndLastTextNode(sibling as Node, first);    
                    }
                } else return findFirstAndLastTextNode.call(null, child as Node, first)
            } catch(e) {
                const blankText = document.createTextNode(" ")
                node.insertBefore(blankText, node.firstChild);
                return blankText
                //to be refactored
            }
            
        }

        const findNextLine = (line: Node):Node|null => {
            if(line.nextSibling && line.nextSibling.nodeName === 'P') return line.nextSibling as Node;
            else {
                if(!line.nextSibling) return null;
                else return findNextLine(line.nextSibling as Node);
            } 
        }
    

        if(line.contains(anchorNode) && line.contains(focusNode)) setRangeStartAndEnd(anchorNode, focusNode, anchorOffset, focusOffset, range);
        else if(!line.contains(anchorNode) && !line.contains(focusNode)) setRangeStartAndEnd(findFirstAndLastTextNode(line, true), findFirstAndLastTextNode(line, false), 0, findFirstAndLastTextNode(line, false).textContent?.length as number, range);
        
        else {
            let [markerNode, markerNodeOffset] = line.contains(anchorNode) ? [anchorNode, anchorOffset] : [focusNode, focusOffset];     
            if(findNextLine(line) && selection.containsNode(line.nextSibling as Node, true)) setRangeStartAndEnd(markerNode, findFirstAndLastTextNode(line, false) as Node, markerNodeOffset, findFirstAndLastTextNode(line, false).textContent?.length as number, range)
            else setRangeStartAndEnd(findFirstAndLastTextNode(line, true) as Node, markerNode, 0, markerNodeOffset, range);
        }

        selection.addRange(range)


        const arr: Node[] = []

        const [start, end, startOffset, endOffset] = [range.startContainer, range.endContainer, range.startOffset, range.endOffset]

        searchTextNode(start, 'right', arr, selection);

        console.log(arr, startOffset, endOffset, range);
        debugger;
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
        for(let j = top; j <= bottom; j++) customizeLetter(style, pCollection[j], selection)
        
        selection.collapseToEnd()
        
        setPaletteVisible(false);
    }

    const updateRangeDomRect = () => setRangeDomRect(selection.getRangeAt(0).getBoundingClientRect());

    const updatePaletteVisible = (isMouseUp: boolean) => { 
        if(isMouseUp) {
            let timer = setTimeout(()=>{
                if(!selection.getRangeAt(0).collapsed){
                    updateRangeDomRect()
                    setPaletteVisible(true);
                } 
                else setPaletteVisible(false);
                clearTimeout(timer)
            }, 30)
        }

    }
    
    useEffect(()=>{
        document.addEventListener('mousedown', setMouseOrKeyDown)
        document.addEventListener('keydown', setMouseOrKeyDown)
        document.addEventListener('mouseup', setMouseOrKeyUp)
        document.addEventListener('keyup', setMouseOrKeyUp)
    },[])


    useEffect(()=>{
        if(document.getSelection()?.rangeCount) {
            updatePaletteVisible(isMouseOrKeyUp)  
        } else {}
    },[isMouseOrKeyUp])

    return(
        <>
        <p className={className}><br/></p>
        {paletteVisible && <TextEditPalette change={change} rangeDomRect={rangeDomRect as DOMRect}/>}
        
        </>
    )
}

export {EditableP};