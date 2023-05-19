import React, {useEffect, useState, useRef, useCallback} from 'react'
import styles from './Partition.module.scss'
import ArticleFeed from '@/components/ArticleFeed/ArticleFeed';
import {leftArrow, rightArrow} from '@/icons/icons';
import ButtonComponent from '@/components/Global/ButtonComponent';
import PartitionIndex from './PartitionIndex';


interface PartitionProps {
    title: string,
    data: Array<any>,
    partitionKey: number
    status?: string,
    error?: unknown
}


function Partition({title, data, partitionKey}:PartitionProps) {

    const [scrollIdx, setScrollIdx] = useState<number>(0);
    const [totalIdx, setTotalIdx] = useState<number>(0);

    const containerTranslated = useRef<number>(0);
    const prevPartitionWidth = useRef<number>(0);


    //----------------------------------------------------------------scroll related--------------------------------------------------------------------

    const updateTotalIdx = (container: HTMLElement, partition: HTMLElement, scrollDiff: number) => {
        const containerPartitionOffset = container?.offsetWidth as number - (partition?.offsetWidth as number)
        const newTotalIdx = Math.ceil(containerPartitionOffset/scrollDiff)
        setTotalIdx(newTotalIdx);
        return [containerPartitionOffset, newTotalIdx];
    }

    const updateScrollIdx = (idx: number) => setScrollIdx(idx);


    const scrollDiff = 400;

    interface ScrollMethodParam {
        arg: number,
        index: number,
        partitionId: string,
        containerId: string,
        dif: number
    }

    const scrollParamsTemplate = {
        partitionId: `partition_${title}`,
        containerId: `container_${title}`,
        dif: scrollDiff
    }

    const scrollMethod = (params: ScrollMethodParam) => {
        const elementGetter = (id: string) => { return document.getElementById(id) as HTMLElement }
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
        const [container, partition] = [elementGetter(params.containerId), elementGetter(params.partitionId)]

        const exceed = container.offsetWidth - partition.offsetWidth
        const currentIdx = calcScrollIndex(params.arg, params.index, params.dif, exceed)
        containerTranslated.current = params.dif * currentIdx
        container.setAttribute('style', `transform: translateX(-${containerTranslated.current}px)`);
        

        currentIdx !== 0 ? 
            document.getElementById(`left_button_${title}`)?.setAttribute('style', 'display: block') 
            : 
            document.getElementById(`left_button_${title}`)?.removeAttribute('style')
        currentIdx === exceed/params.dif ?  
            document.getElementById(`right_button_${title}`)?.setAttribute('style', 'display: none') 
            :
            document.getElementById(`right_button_${title}`)?.removeAttribute('style')
    }

    const leftScrollEventCaller = useCallback(scrollMethod.bind(null, {...scrollParamsTemplate, index: scrollIdx, arg: -1}),[scrollParamsTemplate, scrollIdx])
    const rightScrollEventCaller = useCallback(scrollMethod.bind(null, {...scrollParamsTemplate, index: scrollIdx, arg: 1}),[scrollParamsTemplate, scrollIdx])

    //----------------------------------------------------------------scroll related--------------------------------------------------------------------
    
    


    const adjustOnWindowResizing = (previousWidth:React.MutableRefObject<number>, scrollDiff: number, containerTranslated: React.MutableRefObject<number>) => {
        const container = document.getElementById(`container_${title}`) as HTMLElement
        const partition = document.getElementById(`partition_${title}`) as HTMLElement
        if((partition.getBoundingClientRect().right as number) >= (container.getBoundingClientRect().right as number) - (scrollDiff * scrollIdx))
        containerTranslated.current -= partition.offsetWidth as number - previousWidth.current 
       
        container.setAttribute('style', `transform: translateX(-${containerTranslated.current}px)`)
        previousWidth.current = partition.offsetWidth as number;
        
        const [containerPartitionOffset, newTotalIdx]= updateTotalIdx(container, partition, scrollDiff)
        updateScrollIdx(newTotalIdx - Math.ceil((containerPartitionOffset - containerTranslated.current)/scrollDiff))
    }

    const adjustEventHandler = () => {
        adjustOnWindowResizing(prevPartitionWidth, scrollDiff, containerTranslated)
    }

    

    useEffect(()=>{
        if(data) {
            const container = document.getElementById(`container_${title}`) as HTMLElement
            const partition = document.getElementById(`partition_${title}`) as HTMLElement           
            prevPartitionWidth.current = document.getElementById(`partition_${title}`)?.offsetWidth as number
            updateTotalIdx(container, partition, scrollDiff);
        }
    },[data])

    //adjusting on window resizing
    useEffect(()=>{    
        window.addEventListener('resize', adjustEventHandler)
        return(()=>{window.removeEventListener('resize', adjustEventHandler)})
    },[scrollIdx])
    
    return(
        <section className={styles.partition} id={`partition_${title}`} style={{'animationDelay': `${(0.2*partitionKey)}s`}}>
            <ButtonComponent className = {`${styles.article_scroll} ` + styles.left} id={`left_button_${title}`} event={[['click', leftScrollEventCaller]]}>
                {leftArrow()}
            </ButtonComponent>
            <ButtonComponent className = {`${styles.article_scroll} `+ styles.right} id={`right_button_${title}`} event={[['click', rightScrollEventCaller]]}>
                {rightArrow()}
            </ButtonComponent>
            <h3 className={styles.partition_title}>{title}</h3>
            <div className={styles.article_container} id={`container_${title}`}>
                {data.map((data:any, index: number)=>{return(<ArticleFeed data={data} key={index}/>)})}
            </div>
            <PartitionIndex totalIdx={totalIdx} scrollIdx={scrollIdx} title={title}/>
        </section>
    )
}

export default Partition;