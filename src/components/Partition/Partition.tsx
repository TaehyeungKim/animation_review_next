import React, {useEffect, useState, useRef} from 'react'
import styles from './Partition.module.scss'
import ArticleFeed from '../ArticleFeed/ArticleFeed'
import {leftArrow, rightArrow} from '../../icons/icons'


interface PartitionProps {
    title: string;
}

const loadArticles = async(title: string, start: number, limit: number, settingResources: (resources: Array<any>)=>void) => {

    const query = new URLSearchParams(
        {'_start': `${start}`, '_limit': `${limit}`}
    )
    const resource = await fetch('https://jsonplaceholder.typicode.com/photos?' + query, {
        method: 'GET'
    })
    const res = await resource.json();
    settingResources(res);
    
}
function Partition({title}:PartitionProps) {
    const [resources, setResources] = useState<Array<any>>([]);
    const [scrollIdx, setScrollIdx] = useState<number>(0);
    const containerTranslated = useRef<number>(0);

    const updateScrollIdx = (idx: number) => {
        setScrollIdx(idx);
    }

    const settingResources = (resources: Array<any>) => {
        setResources(resources)
    }

    const scrollDiff = 400;
    let windowWidth = window.innerWidth;

    const scrollMethod = (arg: number, index:number, partition: HTMLElement, container:HTMLElement, dif: number) => {
        const calcScrollIndex = (arg: number, index:number, dif: number, exceed: number) => {
            let returnIdx = 0;
            if(((index + arg)*dif < exceed) && ((index+arg)*dif > 0)) returnIdx = index + arg
            else {
                if((index +arg)*dif <= 0) returnIdx=0
                else if((index+arg)*dif >= exceed) returnIdx = index + (exceed - index*dif)/dif
            }
            updateScrollIdx(returnIdx);
            return returnIdx
        }
        const exceed = container.offsetWidth - partition.offsetWidth
        const currentIdx = calcScrollIndex(arg, index, dif, exceed)
        container.setAttribute('style', `transform: translateX(-${dif * currentIdx}px)`)

        currentIdx !== 0 ? 
            document.getElementById(`left_button_${title}`)?.setAttribute('style', 'display: block') 
            : 
            document.getElementById(`left_button_${title}`)?.removeAttribute('style')
        currentIdx === exceed/dif ?  
            document.getElementById(`right_button_${title}`)?.setAttribute('style', 'display: none') 
            :
            document.getElementById(`right_button_${title}`)?.removeAttribute('style')

    } 

    const adjustOnWindowResizing = (previousWidth: number, scrollDiff: number, containerTranslated: React.MutableRefObject<number>) => {
        const partition = document.getElementById(`partition_${title}`)
        const container = document.getElementById(`container_${title}`)
        if(window.innerWidth === partition?.offsetWidth && container) {
            if(partition.getBoundingClientRect().right >= container.getBoundingClientRect().right - (scrollDiff * scrollIdx))
            containerTranslated.current -= window.innerWidth - previousWidth 
            container.setAttribute('style', `transform: translateX(-${containerTranslated.current}px)`)
        } 
        windowWidth = window.innerWidth;
        console.log( scrollIdx, previousWidth, window.innerWidth, scrollDiff * scrollIdx, containerTranslated.current);
    }

    const adjustEventHandler = () => {
        adjustOnWindowResizing(windowWidth, scrollDiff, containerTranslated)
    }

    

    useEffect(()=>{
        loadArticles(title, 0, 5, settingResources)
    },[])

    //adjusting on window resizing
    useEffect(()=>{
        containerTranslated.current = scrollIdx * scrollDiff;
        window.addEventListener('resize', adjustEventHandler)
        return(()=>{window.removeEventListener('resize', adjustEventHandler)})
    },[scrollIdx])
    return(
        <section className={styles.partition} id={`partition_${title}`}>
            <button className={`${styles.article_scroll} ` + styles.left} id={`left_button_${title}`} onClick={
                ()=>{
                    scrollMethod(-1, scrollIdx, document.getElementById(`partition_${title}`)!, document.getElementById(`container_${title}`)!, scrollDiff)
                    }
            }>
                {leftArrow()}
            </button>
            <button className={`${styles.article_scroll} `+ styles.right} id={`right_button_${title}`} onClick={
                ()=>{
                    scrollMethod(1, scrollIdx, document.getElementById(`partition_${title}`)!, document.getElementById(`container_${title}`)!, scrollDiff)
                    }
            } >
                    {rightArrow()}
            </button>
            <h3 className={styles.partition_title}>{title}</h3>
            <div className={styles.article_container} id={`container_${title}`}>
                {resources.length > 0 ? resources.map((data:any)=>{
                    return (<ArticleFeed data={data}/>)
                }): null}
               
            </div>
        </section>
    )
}

export default Partition;