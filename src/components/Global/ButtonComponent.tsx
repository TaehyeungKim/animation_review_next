import React from 'react';
import styles from './ButtonComponent.module.scss';


interface ButtonComponentProps {
    className: string,
    children: JSX.Element,
    event?: Array<Array<any>>
    id?: string
}

function ButtonComponent({className, children, event, id}:ButtonComponentProps) {

     const props = {className: `${className} ${styles.basic}`, children: children, id: id}
     if(event) {
        event.forEach((m:Array<any>)=>{
            Object.defineProperty(props, m[0], {
                value: m[1],
                enumerable: true,
                configurable: true,
                writable: true
            })
        })
     }

    const element = React.createElement('button', props)
    return(
        element
    )
}

export default ButtonComponent