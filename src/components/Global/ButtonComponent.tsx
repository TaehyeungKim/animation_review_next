import React from 'react';
import { createPortal } from 'react-dom';
import {JsxElement} from 'typescript'

interface ButtonComponenetProps {
    className: string,
    image: ()=>JsxElement

}

function ButtonComponent({className, image}:ButtonComponenetProps) {

    const element = React.createElement('button', {
        className: className,
        children: image()
    })
    return(
        element
    )
}

export default ButtonComponent