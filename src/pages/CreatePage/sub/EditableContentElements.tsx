import { useEffect, useRef } from "react";
import { isForOfStatement } from "typescript";


interface EditableContentElements {
    className: string,
    id?: string
}

interface EditablePprops extends EditableContentElements {

}

function EditableP({className}:EditablePprops) {

    const changeLetterColor = (color: string, line: Node, selection: Selection) => {

        const {anchorNode, focusNode, anchorOffset, focusOffset} = selection 
        if(anchorNode?.nodeName !== '#text' || focusNode?.nodeName !== '#text') return ;

        const range = new Range();


        const setRangeStartAndEnd = (firstNode: Node, secondNode: Node, firstOffset: number, secondOffset: number, range: Range) => {
            try {
                range.setStart(firstNode, firstOffset);
                range.setEnd(secondNode, secondOffset);
                if(range.toString()==="") throw new Error("anchorNode is latter than the focusNode");
            } catch(e) {
                range.setStart(secondNode, secondOffset);
                range.setEnd(firstNode, firstOffset);
            }
            
        }

        const span = document.createElement('span');
        span.setAttribute('style', `color: ${color}`);

        if(line.contains(anchorNode) && line.contains(focusNode)) setRangeStartAndEnd(anchorNode, focusNode, anchorOffset, focusOffset, range);
        else if(!line.contains(anchorNode) && !line.contains(focusNode)) setRangeStartAndEnd(line.firstChild as Node, line.lastChild as Node, 0, line.lastChild?.textContent?.length as number, range);
        else {
            let [markerNode, markerNodeOffset] = line.contains(anchorNode) ? [anchorNode, anchorOffset] : [focusNode, focusOffset]; 
            if(line.nextSibling && selection.containsNode(line.nextSibling as Node, true)) {
                setRangeStartAndEnd(markerNode, line.lastChild as Node, markerNodeOffset, line.lastChild?.textContent?.length as number, range);
                console.log('changed1')
            }
            else {
                setRangeStartAndEnd(line.firstChild as Node, markerNode, 0, markerNodeOffset, range);
                console.log('changed2')
            }
        }

        const extracted = range.extractContents().textContent as string;
        span.appendChild(document.createTextNode(extracted));
        range.insertNode(span);
    }

    const change = (selection: Selection, color: string)=> {
        const pCollection = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLParagraphElement>;
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
            changeLetterColor(`${color}`, pCollection[j], selection)
        }
    }

    const changeRed = change.bind(null, document.getSelection() as Selection, 'red')
    const changeGreen = change.bind(null, document.getSelection() as Selection, 'green')
    const changeYellow = change.bind(null, document.getSelection() as Selection, 'yellow')

    useEffect(()=>{
        document.getElementById('change_red')?.addEventListener('click', changeRed)
        document.getElementById('change_green')?.addEventListener('click', changeGreen)
        document.getElementById('change_yellow')?.addEventListener('click', changeYellow)
    },[])
   
    return(
        <>
        <p className={className}><br/></p>
        </>
    )
}

export {EditableP};