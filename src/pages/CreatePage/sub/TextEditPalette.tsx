import React, { useState, useLayoutEffect, useRef, useReducer } from "react";
import { SpanStyle } from "./InterFaceModule";

import ButtonComponent from "../../../components/Global/ButtonComponent"
import styles from './TextEditPalette.module.scss'
import {fontColor, bold} from '../../../icons/icons'

interface TextEditPaletteProps {
    change: (selection: Selection, style: SpanStyle) => void,
    rangeDomRect: DOMRect
}

interface PaletteStyle {
    top: number|string,
    bottom: number|string,
    transform: string
} 

interface PaletteState {
    type: string,
    opened: boolean
}

interface PaletteAction {
    type: string,
    opened: boolean
}

const reducer = (state: PaletteState, action: PaletteAction ) => {
    if(action.type === state.type) {
        switch(action.type) {
            default:
                return {type: "none", opened: !state.opened}
            case "color":
                return {type: "color", opened: !state.opened}
            case "font-size":
                return {type: "font-size", opened: !state.opened};
        }
    } else {
        switch(action.type) {
            default:
                return {type: "none", opened: true}
            case "color":
                return {type: "color", opened: true}
            case "font-size":
                return {type: "font-size", opened: true};
        }
    }
    
}

interface PaletteSubComponentProps {
    change: (selection: Selection, style: SpanStyle) => void,
    selection: Selection,
    containerRef: React.RefObject<HTMLDivElement>
}

interface ColorPaletteProps extends PaletteSubComponentProps {
    colorArr: string[]
}

function ColorSubPalette({change, selection, colorArr, containerRef}: ColorPaletteProps) {

    const [styleOfTheSubPalette, setStyleOfTheSubPalette] = useState<React.CSSProperties>({top: 0});

    useLayoutEffect(()=>{
        const heightOfWholePalette = containerRef.current?.offsetHeight as number;
        setStyleOfTheSubPalette({...styleOfTheSubPalette, top: heightOfWholePalette})
    },[])
    return (
        <div className={styles.colorPalette} style={styleOfTheSubPalette}>
            {colorArr.map((color: string, index: number) => {
                const colorPaletteElm = <div className = {styles.color} style={{background: `${color}`}} onSelect={()=>{return false}}></div>
                return <ButtonComponent className={styles.color_button} children={colorPaletteElm} key={index} event={[['click', change.bind(null, selection, {
                    propertyKey: 'color',
                    propertyValue: color
                })]]}/>
            })
            }
        </div>
    )
}



function TextEditPalette({change, rangeDomRect}: TextEditPaletteProps) {

    const [paletteStyle, setPaletteStyle] = useState<PaletteStyle>({top: 'initial', bottom: 'initial', transform: 'initial'})

    const [state, dispatch] = useReducer(reducer, {type: "none", opened: false})

    const showSubComponent = (type: string) => dispatch({type: type, opened: true})

    const containerRef = useRef<HTMLDivElement>(null);

    const colorArr = ['black','red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple', 'pink']

    const selection = document.getSelection() as Selection

    const { bottom, top } = rangeDomRect;

    useLayoutEffect(()=>{
        const contentAreaClientRect = document.getElementById('contentArea')?.getBoundingClientRect() as DOMRect
        const [contentAreaBottom, contentAreaTop] = [contentAreaClientRect.bottom, contentAreaClientRect.top]; 
        if(containerRef.current) {
            if(bottom  + containerRef.current.offsetHeight > contentAreaBottom) setPaletteStyle({
                ...paletteStyle, bottom: contentAreaBottom-bottom, transform: `translateY(${-Math.min(100, bottom-top)}px)`, top: 'initial' })
            else setPaletteStyle({...paletteStyle, bottom: 'initial', transform: `translateY(${bottom-top}px)`, top: top - contentAreaTop})
        }
    },[rangeDomRect])

    return(
        <div className = {styles.container} contentEditable='false' ref={containerRef} style={paletteStyle as React.CSSProperties}>
            <ButtonComponent className = {styles.colors} children={fontColor()} event={[['click', showSubComponent.bind(null, "color")],['select', ()=>{return false}]]}/>
            <ButtonComponent className={styles.bold} children = {bold()} event={[['click', change.bind(null, selection, {
                propertyKey: 'font-weight',
                propertyValue: 'bold'
            })]]}/>
            {(()=>{
                switch(state.type) {
                    default: 
                        return ;
                    case "color":
                        return state.opened ? <ColorSubPalette change={change} selection={selection} colorArr={colorArr} containerRef={containerRef}/> : null
                }
            })()}
        </div>
        
    )
}

export default TextEditPalette