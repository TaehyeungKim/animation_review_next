import React, { useState, useLayoutEffect, useRef } from "react";
import { SpanStyle } from "./InterFaceModule";

import ButtonComponent from "../../../components/Global/ButtonComponent"
import styles from './TextEditPalette.module.scss'

interface TextEditPaletteProps {
    change: (selection: Selection, style: SpanStyle) => void,
    rangeDomRect: DOMRect
}

interface PaletteStyle {
    top: number|string,
    bottom: number|string,
    transform: string
} 


function TextEditPalette({change, rangeDomRect}: TextEditPaletteProps) {

    const [paletteStyle, setPaletteStyle] = useState<PaletteStyle>({top: 'initial', bottom: 'initial', transform: 'initial'})

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
            <div className={styles.colorPalette}>
                {colorArr.map((color: string, index: number) => {
                    const colorPaletteElm = <div className = {styles.color} style={{background: `${color}`}} onSelect={()=>{return false}}></div>
                    return <ButtonComponent className={styles.colors} children={colorPaletteElm} key={index} event={[['click', change.bind(null, selection, {
                        propertyKey: 'color',
                        propertyValue: color
                    })]]}/>
                })
                }
            </div>
            <ButtonComponent className={styles.bold} children = {<div>굵게</div>} event={[['click', change.bind(null, selection, {
                propertyKey: 'font-weight',
                propertyValue: 'bold'
            })]]}/>
        </div>
    )
}

export default TextEditPalette