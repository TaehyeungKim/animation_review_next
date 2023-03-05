import React, {useEffect, useState, useRef} from 'react'
import { useQuery } from 'react-query'
import styles from './Partition.module.scss'
import ArticleFeed from '../ArticleFeed/ArticleFeed'
import {leftArrow, rightArrow} from '../../icons/icons'
import ButtonComponent from '../Global/ButtonComponent';
import PartitionIndex from './PartitionIndex';


interface PartitionProps {
    title: string,
    data: Array<any>,
    status: string,
    error: unknown
}

function Partition({title, data, status, error}:PartitionProps) {

    const [scrollIdx, setScrollIdx] = useState<number>(0);
    const [totalIdx, setTotalIdx] = useState<number>(0);

    const containerTranslated = useRef<number>(0);
    const prevPartitionWidth = useRef<number>(0);
    

    const updateTotalIdx = (container: HTMLElement, partition: HTMLElement, scrollDiff: number) => {
        const containerPartitionOffset = container?.offsetWidth as number - (partition?.offsetWidth as number)
        const newTotalIdx = Math.ceil(containerPartitionOffset/scrollDiff)
        setTotalIdx(newTotalIdx);
        return [containerPartitionOffset, newTotalIdx];
    }

    const updateScrollIdx = (idx: number) => setScrollIdx(idx);


    let scrollDiff = 400;

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
        containerTranslated.current = dif * currentIdx
        container.setAttribute('style', `transform: translateX(-${containerTranslated.current}px)`);
        

        currentIdx !== 0 ? 
            document.getElementById(`left_button_${title}`)?.setAttribute('style', 'display: block') 
            : 
            document.getElementById(`left_button_${title}`)?.removeAttribute('style')
        currentIdx === exceed/dif ?  
            document.getElementById(`right_button_${title}`)?.setAttribute('style', 'display: none') 
            :
            document.getElementById(`right_button_${title}`)?.removeAttribute('style')

    } 

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
        if(status === 'success') {
            const container = document.getElementById(`container_${title}`) as HTMLElement
            const partition = document.getElementById(`partition_${title}`) as HTMLElement           
            prevPartitionWidth.current = document.getElementById(`partition_${title}`)?.offsetWidth as number
            updateTotalIdx(container, partition, scrollDiff);
        }
    },[status])

    //adjusting on window resizing
    useEffect(()=>{
        if(status === 'success') {
            window.addEventListener('resize', adjustEventHandler)
            return(()=>{window.removeEventListener('resize', adjustEventHandler)})
        }
    },[status,scrollIdx])
    
    return(
        <section className={styles.partition} id={`partition_${title}`}>
            <ButtonComponent className = {`${styles.article_scroll} ` + styles.left} children={leftArrow()} id={`left_button_${title}`} event={[['onClick', ()=>scrollMethod(-1, scrollIdx, document.getElementById(`partition_${title}`)!, document.getElementById(`container_${title}`)!, scrollDiff)]]}/> 
            <ButtonComponent className = {`${styles.article_scroll} `+ styles.right} children={rightArrow()} id={`right_button_${title}`} event={[['onClick', ()=>scrollMethod(1, scrollIdx, document.getElementById(`partition_${title}`)!, document.getElementById(`container_${title}`)!, scrollDiff)]]}/>
            <h3 className={styles.partition_title}>{title}</h3>
            <div className={styles.article_container} id={`container_${title}`}>
                {data.map((data:any, index: number)=>{return(<ArticleFeed data={data} key={index}/>)})}
            </div>
            <PartitionIndex totalIdx={totalIdx} scrollIdx={scrollIdx} title={title}/>
        </section>
    )
}

export default Partition;