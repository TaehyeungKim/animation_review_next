export type TextIndexMap = {
    [key: string]: string;
}

export function MapTextNodeWithIndex(element: Element, map: TextIndexMap, start = '0') {
    
    const childNodes = element.childNodes;
    
    if(element.childElementCount === 0) {
        const newIndex = `${start}.0`
        Object.defineProperty(map, newIndex, {
            value: element.textContent as string,
            writable: true,
            enumerable: true,
            configurable: true
        });
        element.textContent = ""
    }

    else {
        childNodes.forEach((node: ChildNode, index: number)=>{
            if(node.nodeName === "#text" && node.textContent !== "") {
                Object.defineProperty(map, start+`.${index}`,{
                value: node.textContent as string,
                writable: true,
                enumerable: true,
                configurable: true
            })
            node.textContent = ""
            }
            else {
                MapTextNodeWithIndex(node as Element, map, start+`.${index}`);
            }
        })
    }
}

export function PostSpaceMapping(elem: Element, map: TextIndexMap, start='0') {
    const childSpaces = elem.childNodes;

    if(elem.childElementCount === 0) {
        const newIndex = `${start}.0`
        elem.textContent = map[newIndex];
    } else {
        childSpaces.forEach((node: ChildNode, index: number)=>{
            if(node.nodeName === "#text") {
                if(map[start + `.${index}`]) node.textContent = map[start + `.${index}`]
            }
            else {
                PostSpaceMapping(node as Element, map, start + `.${index}`)
            }
        })
    }
}
