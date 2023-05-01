import React, {useRef, cloneElement} from 'react'

function* stringtIterator(str: string, start=0): Generator {
    for(let i = start; i < str.length; i++) yield [str[i], i]
}

export default function createElementByRecursion(str: string) {
    const iterator = stringtIterator(str);

    //phase1: parsing tag name

    let tagName = "";
    let phaseMarker = "";
    let endItselfTag = false;

    while(true) {
        const [currentCharacter, currentPosition] = iterator.next().value;

        if(currentCharacter === "\\") continue

        if(currentCharacter === " " || currentCharacter === ">") {
            const regexp = /.*\//i
            if(regexp.test(tagName)) {
                tagName = tagName.split("/")[0];
                endItselfTag = true;
            }
            phaseMarker = currentCharacter
            break
        };

        if(currentPosition !== 0) tagName += currentCharacter;
   
    }


    const element = document.createElement(tagName);

    if(endItselfTag) {
        return element;
    }

    //phase2: parsing attributes

    if(phaseMarker === " ") {
        let attrKeyAndValue = "";
        let alreadyMetWithEquation = false;
        let [metWithFirstQuotation, metWithSecondQuotation]= [false, false]


        while(true) {
            const [currentCharacter, currentPosition] = iterator.next().value;

            if(currentCharacter === "\\") continue


            if(currentCharacter === ">"||currentCharacter === "/") {
                if(attrKeyAndValue !== "") {
                    const [attrKey, attrValue] = attrKeyAndValue.split('=');
                    attrValue === undefined ? 
                    element.setAttribute(attrKey, "") 
                    
                    : 
                    element.setAttribute(attrKey, attrValue.slice(1, attrValue.length-1))
                    
                }
                if(currentCharacter === ">") break;
                else {
                    if(metWithFirstQuotation) return element
                }
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
        phaseMarker = ">"
    }

    //phase3: parsing children
    
    if(phaseMarker === ">") {
        
        let childDepthIndex = 0;
        let childStr = "";
        let tempStr = "";

        const openingTagRegexp = /^<[^/]*?>$/i;
        const closingTagRegexp = /^<\/[^/]*?>$/i;
        const endByItSelfTagRegexp = /^<[^>]*?\/>$/i
        const completeEndedTagRegexp = /^<[^/]*?>.*<\/[^/]*?>$/i


        while(true) {
            const [currentCharacter, currentPosition] = iterator.next().value

            if(currentCharacter === "\\") continue

            if(currentPosition === str.length-1) {
                break;
            }

            tempStr += currentCharacter;

            if(currentCharacter !== ">") {

            }
            else {
                if(endByItSelfTagRegexp.test(tempStr)) {
                    childStr = tempStr;
                    element.appendChild(document.createTextNode(""))
                    element.appendChild(createElementByRecursion(childStr));
                    
                    
                    

                    childStr = tempStr = "";
                }
                else {
                    if(openingTagRegexp.test(tempStr)) {
                        childDepthIndex += 1;
                        childStr += tempStr;
                        tempStr = "";
                    }
                    if(closingTagRegexp.test(tempStr)) {
                        childDepthIndex -= 1;
                        childStr += tempStr;
                        tempStr = "";
                    }
                    if(completeEndedTagRegexp.test(childStr) && childDepthIndex === 0) {
                        element.appendChild(document.createTextNode(""))
                        element.appendChild(createElementByRecursion(childStr));
                        childStr = tempStr = "";
                    }
                }
            }

            
        }
    }

    element.appendChild(document.createTextNode(""))
    return element;
}