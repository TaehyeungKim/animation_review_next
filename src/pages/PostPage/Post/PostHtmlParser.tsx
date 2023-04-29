type ElemProperty = {
    tagName?: string,
    attributes?: any
}

function* stringtIterator(str: string, start=0): Generator {
    for(let i = start; i < str.length; i++) yield [str[i], i]
}

export default function createElementByRecursion(str: string) {
    const iterator = stringtIterator(str);

    const elmProperty: ElemProperty  = {}

    let tagName = "";


    while(true) {
        const [currentCharacter, currentPosition] = iterator.next().value;

        if(currentCharacter === " " || currentCharacter === ">") break;

        if(currentPosition !== 0) tagName += currentCharacter;

        
    }

    const element = document.createElement(tagName);

    let attrKeyAndValue = "";
    let alreadyMetWithEquation = false;
    let [metWithFirstQuotation, metWithSecondQuotation]= [false, false]

    while(true) {
        const [currentCharacter, currentPosition] = iterator.next().value;

        if(currentCharacter === ">") {
            if(attrKeyAndValue !== "") {
                const [attrKey, attrValue] = attrKeyAndValue.split('=');
                attrValue === "" ? element.setAttribute(attrKey, "") : element.setAttribute(attrKey, attrValue.slice(1, attrValue.length-1))
                
            }
            break;
        }
        if(currentCharacter === "=") alreadyMetWithEquation = true;

        if(currentCharacter === '"') {
            if(!metWithFirstQuotation) metWithFirstQuotation = true;
            else metWithSecondQuotation = true;
        }

        attrKeyAndValue += currentCharacter;

        if(currentCharacter === " ") {
            if(!alreadyMetWithEquation) {
                let attrKey = attrKeyAndValue.slice(0,attrKeyAndValue.length - 1);
                element.setAttribute(attrKey, "");

                attrKeyAndValue = "";
            } 
            else {
                if(metWithSecondQuotation) {
                    attrKeyAndValue = attrKeyAndValue.slice(0, attrKeyAndValue.length - 1);
                    const [attrKey, attrValue] = attrKeyAndValue.split("=");

                    element.setAttribute(attrKey, attrValue.slice(1,attrValue.length-1))

                    attrKeyAndValue = "";

                    alreadyMetWithEquation = false;
                    [metWithFirstQuotation, metWithSecondQuotation]= [false, false]
                }
            }
        }

        
    }
    return element;
}