import { useEffect, useRef } from "react";
import { isForOfStatement } from "typescript";


interface EditableContentElements {
    className: string,
    id?: string
}

interface EditablePprops extends EditableContentElements {

}

function EditableP({className}:EditablePprops) {

    const changeLetterColor = (color: string) => {
        const selection = document.getSelection() as Selection
        const {anchorNode, focusNode, anchorOffset, focusOffset} = selection 
        if(anchorNode?.nodeName !== '#text') return ;
        
        const selectedLinesArray: Node[] = [];
        const loopMarker = (anchorNode: Node) => {
            if(anchorNode.parentNode?.nodeName === 'SPAN') return anchorNode.parentNode.parentNode as Node
            else return anchorNode.parentNode as Node
        };

        const deeplySearchTextNode = (node: Node) => {
            const childNodes = node.childNodes as NodeList;
            const returnedArray: Array<Node> = []
            childNodes.forEach((node: Node, index: number, parent: NodeList)=>{
                if(node.nodeName === 'SPAN') returnedArray.push(node.firstChild as Node);
                else returnedArray.push(node);
            })
            return returnedArray
        }

        const detectSpanOnTheBorder = (node: Node) => {
            if(node.parentNode?.nodeName === 'SPAN') return node.parentNode;
            else return null;
        }

        const isLoopMarkerFirst = (loopMarker: Node) => {
            if(loopMarker.nextSibling === null) return false;
            else {
                if(selection.containsNode(deeplySearchTextNode(loopMarker.nextSibling as Node)[0])) return true;
                else return false;
            }
        }

        const orderedAppendChildNodes = (arr: Array<Node>, parent: Node) => arr.forEach((node: Node, index: number)=>{
            parent.appendChild(node);
        })

        let currentLoopP = loopMarker(anchorNode as Node)

        const isAnchorTop = isLoopMarkerFirst(currentLoopP);


        try {
            selectedLinesArray.push(currentLoopP);
            while(true) {
                currentLoopP = isAnchorTop ? currentLoopP.nextSibling as Node : currentLoopP.previousSibling as Node;
                if(currentLoopP === null) throw new Error('선택된 범위의 끝입니다.') 
                else selectedLinesArray.push(currentLoopP)
                
            }
        } catch(e) {console.log(e, selectedLinesArray)}

        selectedLinesArray.forEach((node: Node)=>{
            const span = document.createElement('span');
            span.setAttribute('style', `color: ${color}`);

            let [anchorNodeIndex, focusNodeIndex] = [-1,-1];
            let [storedTextInTopRange, storedTextInBottomRange] = ["",""]

            node.childNodes.forEach((node: ChildNode, index: number)=>{
                let comparedNode: Node;
                switch(node.nodeName) {
                    case "#text":
                        comparedNode = node;
                        break;
                    case "SPAN":
                        comparedNode = node.firstChild as Node;
                        break;
                    default:
                        comparedNode = node;
                }
                if(comparedNode === anchorNode) anchorNodeIndex = index;
                if(comparedNode === focusNode) focusNodeIndex = index;
            });;

            const clonedP = node.cloneNode(false);
            const storedListForAppendLater: Node[] = [];

            const storeTextInTopRange = (node: Node, markerNodeIndex: number, store: string, uplimit:null|number = null) => {
                node.childNodes.forEach((node: ChildNode, index: number)=>{
                    const clonedNode = node.cloneNode(true);
                    if(index < markerNodeIndex) clonedP.appendChild(clonedNode); 
                    else {
                        if(uplimit) {
                            if(index <= uplimit) store += node.textContent
                        } else {
                            store += node.textContent
                        }
                    }
                    })
               return store
            }

            const storeTextInBottomRange = (node: Node, markerNodeIndex: number, store: string, downlimit: null|number = null) => {
                node.childNodes.forEach((node: ChildNode, index: number)=>{
                    if(index > markerNodeIndex) storedListForAppendLater.push(node); 
                    else {
                        if(downlimit) {
                            if (index >= downlimit ) store += node.textContent
                        } else {
                            store += node.textContent
                        }
                    }
                })
                return store
            }

            let toBeInNewSpan: Text; 

            const updateSelectedRangeTop = (markerNode: Node, markerOffset: number, store: string, spanOnTheBorder: ParentNode) => {
                if(spanOnTheBorder) {
                    const clonedSpanOnTheBorder = spanOnTheBorder.cloneNode(false);
                    clonedSpanOnTheBorder.appendChild(document.createTextNode(markerNode.textContent?.slice(0,markerOffset) as string));
                    toBeInNewSpan = document.createTextNode(store.slice(markerOffset));
                    span.appendChild(toBeInNewSpan);
                    orderedAppendChildNodes([clonedSpanOnTheBorder, span], clonedP);
                } else {
                    toBeInNewSpan = document.createTextNode(store.slice(markerOffset));
                    span.appendChild(toBeInNewSpan);
                    orderedAppendChildNodes([document.createTextNode(store.slice(0, markerOffset)), span], clonedP)
                }
            }

            const updateSelectedRangeBottom = (markerNode: Node, markerOffset: number, store: string, spanOnTheBorder: ParentNode) => {
                if(spanOnTheBorder) {
                    const clonedSpanOnTheBorder = spanOnTheBorder.cloneNode(false);
                    clonedSpanOnTheBorder.appendChild(document.createTextNode(markerNode.textContent?.slice(markerOffset) as string));
                    toBeInNewSpan = document.createTextNode(store.slice(0,store.length - (markerNode.textContent?.length as number) + markerOffset));
                    span.appendChild(toBeInNewSpan);
                    orderedAppendChildNodes([span, clonedSpanOnTheBorder,...storedListForAppendLater], clonedP);
                } else {
                    toBeInNewSpan = document.createTextNode(store.slice(0, store.length - (markerNode.textContent?.length as number) + markerOffset));
                    span.appendChild(toBeInNewSpan);
                    orderedAppendChildNodes([span, document.createTextNode(markerNode.textContent?.slice(markerOffset) as string)], clonedP)
                }
            }

            const updateFormerBorder = (borderNode: Node, offset: number, spanOnTheBorder: ParentNode) => {
                if(spanOnTheBorder) {
                    const clonedSpanOnTheBorder = spanOnTheBorder.cloneNode(false);
                    clonedSpanOnTheBorder.appendChild(document.createTextNode(borderNode.textContent?.slice(0,offset) as string));
                    return clonedSpanOnTheBorder;
                } else {
                    return null;
                }
            }

            const updateLatterBorder = (borderNode: Node, offset: number, spanOnTheBorder: ParentNode) => {
                if(spanOnTheBorder) {
                    const clonedSpanOnTheBorder = spanOnTheBorder.cloneNode(false);
                    clonedSpanOnTheBorder.appendChild(document.createTextNode(borderNode.textContent?.slice(offset) as string))
                } else {
                    return null;
                }
            }

            //if these indexes are not -1, then this node (p line) contains the anchorNode or focusNode;
            if(anchorNodeIndex !== -1 && focusNodeIndex === -1) {
                const spanOnTheBorder = detectSpanOnTheBorder(anchorNode) as ParentNode;
                switch(isAnchorTop) {
                    case true:
                        storedTextInTopRange = storeTextInTopRange(node, anchorNodeIndex, storedTextInTopRange)
                        updateSelectedRangeTop(anchorNode, anchorOffset, storedTextInTopRange, spanOnTheBorder);
                        break;
                    case false:
                        storedTextInBottomRange = storeTextInBottomRange(node, anchorNodeIndex, storedTextInBottomRange)
                        updateSelectedRangeBottom(anchorNode, anchorOffset, storedTextInBottomRange, spanOnTheBorder);
                        break;
                }
                node.parentNode?.replaceChild(clonedP, node);
            } else if(anchorNodeIndex === -1 && focusNodeIndex !== -1) {
                const spanOnTheBorder = detectSpanOnTheBorder(focusNode as Node) as ParentNode;
                switch(isAnchorTop) {
                    case true:
                        storedTextInBottomRange = storeTextInBottomRange(node, focusNodeIndex, storedTextInBottomRange);
                        updateSelectedRangeBottom(focusNode as Node, focusOffset, storedTextInBottomRange, spanOnTheBorder);
                        break;
                    case false:
                        storedTextInTopRange = storeTextInTopRange(node, focusNodeIndex, storedTextInTopRange);
                        updateSelectedRangeTop(focusNode as Node, focusOffset, storedTextInTopRange, spanOnTheBorder)
                        break;
                }   
                node.parentNode?.replaceChild(clonedP, node);
            } else if(anchorNodeIndex !== -1 && focusNodeIndex !== -1) {
                const spanOnTheAnchor = detectSpanOnTheBorder(anchorNode);
                const spanOnTheFocus = detectSpanOnTheBorder(focusNode as Node);
                let [start, end] = [Math.min(focusNodeIndex, anchorNodeIndex), Math.max(focusNodeIndex, anchorNodeIndex)];
                try {
                    storedTextInTopRange = storeTextInTopRange(node, start, storedTextInTopRange, end)  
                    storedTextInBottomRange = storeTextInBottomRange(node, end, storedTextInBottomRange, start)
                    if(storedTextInTopRange === storedTextInBottomRange) {
                        if(!spanOnTheAnchor && !spanOnTheFocus) {
                            span.appendChild(document.createTextNode(storedTextInTopRange.slice(start, end)));
                            orderedAppendChildNodes([document.createTextNode(storedTextInTopRange.slice(0,start)), span, document.createTextNode(storedTextInTopRange.slice(end))],clonedP)
                            console.log([document.createTextNode(storedTextInTopRange.slice(0,start)), span, document.createTextNode(storedTextInTopRange.slice(end))])
                        }
                    }
                } catch(e) {console.log(e)}
                
            } 
        })
    }

    const change = changeLetterColor.bind(null, 'red');

    useEffect(()=>{
        window.addEventListener('resize', change)
    },[])
   
    return(
        <>
        <p className={className}><br/></p>
        </>
    )
}

export {EditableP};