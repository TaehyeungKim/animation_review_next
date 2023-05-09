import React, {useState, useRef} from 'react'
import styles from './WriteContentAside.module.scss'

import {imageAdd} from '@/icons/icons'
import ButtonComponent from '@/components/Global/ButtonComponent';


interface WriteContentAsideProps {
    style: any;
    paragraphMaker:()=>HTMLParagraphElement
}

function WriteContentAside({style, paragraphMaker}: WriteContentAsideProps) {

    const [inpArray, setInpArray] = useState<Array<any>>([]);

    const imageInp = useRef<HTMLInputElement>(null);
    const imageIdx = useRef<number>(0);

    const insertNewImgInp = () => {
        const newInp = React.createElement('input', {
            accept: "image/*",
            type: 'file',
            hidden: true,
            ref: imageInp,
            onChange: insertImageToContent,
            id: ++imageIdx.current,
            key: imageIdx.current,
            className: "imageInp"
        })
        setInpArray(inpArray=>[...inpArray, newInp])
    }
    
    const crawlToTheP = (node: Node): Node => {
        if(node.nodeName === "P") return node;
        else return crawlToTheP(node.parentNode as Node)
    }
    
    
    
    const insertImageToContent = (e:any) => {
        const tempURL = URL.createObjectURL(e.target?.files[0]);
        const imageContainer = document.createElement('div'); imageContainer.setAttribute('class', `${style.imageContainer}`);
        const image = document.createElement('img'); image.setAttribute('src', tempURL);
        imageContainer.appendChild(image);

        const selection = document.getSelection() as Selection;
        const range = selection.getRangeAt(0) as Range;

        const {startContainer, endContainer, startOffset, endOffset} = range

        const theCurrentLine = crawlToTheP(endContainer);

        range.setStart(startContainer, startOffset);
        range.setEnd(theCurrentLine.lastChild as Node, theCurrentLine.lastChild?.textContent?.length as number)

        const extracted = range.extractContents();

        const newParagraph = paragraphMaker();
        newParagraph.removeChild(newParagraph.children[0]); 
        newParagraph.appendChild(extracted);

        document.getElementById('contentArea')?.insertBefore(imageContainer, theCurrentLine.nextSibling as Node);
        document.getElementById('contentArea')?.insertBefore(newParagraph, imageContainer.nextSibling as Node);

        document.getSelection()?.setBaseAndExtent(imageContainer, 0, imageContainer, 0);    

        insertNewImgInp();

        imageContainer.setAttribute('key', `${imageIdx.current-1}`)


    }

    return (
        <aside className={styles['write--optionbar']} id={'aside'}>
            <ButtonComponent className={styles['write--optionbar--button']} event={[['click', ()=> {
                try{imageInp.current?.click()} catch(e) {console.log(e)}
            }]]}>{imageAdd()}</ButtonComponent>
            <input type='file' accept="image/*" hidden ref={imageInp} onChange={insertImageToContent} key={0} id={'0'} className={'imageInp'}/>
            {inpArray}
        </aside>
    )
}

export default WriteContentAside;