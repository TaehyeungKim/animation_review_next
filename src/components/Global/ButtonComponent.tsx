import {useRef, useEffect} from 'react';
import styles from './ButtonComponent.module.scss';


interface ButtonComponentProps {
    className: string,
    children: JSX.Element,
    event?: Array<Array<any>>
    id?: string,
    style?: React.CSSProperties
}

function ButtonComponent({className, children, event, id, style}:ButtonComponentProps) {

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(()=>{
        if(event) event.forEach((m:Array<any>)=> 
        m[2] ? buttonRef.current?.addEventListener(m[0],m[1],m[2]) : buttonRef.current?.addEventListener(m[0],m[1]))
        return (()=>{
            if(event) event.forEach((m: Array<any>)=> 
            m[2] ? buttonRef.current?.removeEventListener(m[0],m[1],m[2]) : buttonRef.current?.removeEventListener(m[0],m[1]))
        })  
    },[event])

    return(
        <button className={`${className} ${styles.basic}`} id={id} ref={buttonRef} style={style}>
            {children}
        </button>
    )
}

export default ButtonComponent