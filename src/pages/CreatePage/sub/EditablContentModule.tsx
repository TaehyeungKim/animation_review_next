const searchTextNode = (node: Node, status: string, arr: Node[], selection: Selection, firstBranch=true)  => {
    if(!node || !selection.containsNode(node, true) || node.nodeName === 'P') return ;
    if(node.nodeName === '#text') {
        if(node.textContent !== "")  {
            arr.push(node)
        }
    } 
    else {
        if(status !== 'up') searchTextNode(node.childNodes[0], 'down', arr, selection, false)
    }

    if(node.nextSibling === null) {
        if(firstBranch)searchTextNode(node.parentNode as Node, 'up', arr, selection, firstBranch)
        else return ;
    }
    else searchTextNode(node.nextSibling, 'right', arr, selection, firstBranch)
}

export {searchTextNode}

const nextNode = (currentNode: Node):Node=> {
    if(!currentNode.nextSibling) return nextNode(currentNode.parentNode?.nextSibling as Node)
    else return currentNode.nextSibling as Node
}

// const findFirstTextNode = (node: Node):Node=> {
//     if(node.nodeName === "#text") return node;
//     else {
//         const nodeLength = node.childNodes.length as number;
//         for(let i =0; i < nodeLength; i++) {
//             if(node.childNodes[i].textContent !== "") return findFirstTextNode(node.childNodes[i]);
//         }
//     }
// }

// const compareWithNextNode = (currentTextNode: Node, nextTextNode: Node, formerResult: boolean=false) => {

    
//     if(formerResult) return true;
//     else {
//         const result = window.getComputedStyle(currentTextNode.parentNode as Element).getPropertyValue('font-size')
//         === window.getComputedStyle(nextTextNode.parentNode as Element).getPropertyValue('font-size')
//         return compareWithNextNode(nextTextNode)
//     }
// }