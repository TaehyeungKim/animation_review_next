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
    if(!currentNode.nextSibling) return nextNode(currentNode.parentNode as Node)
    else {
        if(currentNode.nextSibling.nodeName === 'BR') return nextNode(currentNode.nextSibling.nextSibling as Node);
        else return currentNode.nextSibling as Node
    }
    
}

const findTextNodeDeep = (node: Node):Node|boolean => {
    if(node.nodeName === '#text')  return node;
    else if(node.nodeName === 'SPAN'|| node.nodeName === 'P') return findTextNodeDeep(node.firstChild as Node)
    else return false;
}

const compareWithNextTextNode = (currentNode: Node, selection:Selection):boolean=> {


    if(!selection.containsNode(nextNode(currentNode), true)) return true;
    else {
        const nextTextNode = findTextNodeDeep(nextNode(currentNode))
        const currentTextNode = findTextNodeDeep(currentNode);
        
        if(typeof(currentTextNode) === 'object' && typeof(nextTextNode) === 'object') {
            if(window.getComputedStyle(currentTextNode.parentNode as Element).getPropertyValue('font-size') === window.getComputedStyle(nextTextNode.parentNode as Element).getPropertyValue('font-size')) 
            return compareWithNextTextNode(nextTextNode, selection)
            else return false;
        } else return false;}
}

export {compareWithNextTextNode}
