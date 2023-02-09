import {useEffect, useState, useRef} from 'react'
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

    const settingResources = (resources: Array<any>) => {
        setResources(resources)
    }

    const scrollIndex = useRef<number>(0)

    const scrollMethod = (arg: number, index:React.MutableRefObject<number>, partition: HTMLElement, container:HTMLElement, dif: number) => {
        const calcScrollIndex = (arg: number, index:React.MutableRefObject<number>, dif: number, exceed: number) => {
            if(((index.current + arg)*dif < exceed) && ((index.current+arg)*dif > 0)) index.current = index.current + arg
            else {
                if((index.current+arg)*dif <= 0) index.current = 0
                else if((index.current+arg)*dif >= exceed) index.current = index.current + (exceed - index.current*dif)/dif
            }
            return index.current
        }
        const exceed = container.offsetWidth - partition.offsetWidth
        container.setAttribute('style', `transform: translateX(-${dif * calcScrollIndex(arg, index, dif, exceed)}px)`)

        index.current !== 0 ? 
            document.getElementById(`left_button_${title}`)?.setAttribute('style', 'display: block') 
            : 
            document.getElementById(`left_button_${title}`)?.removeAttribute('style')
        index.current === exceed/dif ?  
            document.getElementById(`right_button_${title}`)?.setAttribute('style', 'display: none') 
            :
            document.getElementById(`right_button_${title}`)?.removeAttribute('style')

    } 

    

    useEffect(()=>{
        loadArticles(title, 0, 5, settingResources)
        
    },[])
    return(
        <section className={styles.partition} id={`partition_${title}`}>
            <button className={`${styles.article_scroll} ` + styles.left} id={`left_button_${title}`} onClick={
                ()=>{
                    scrollMethod(-1, scrollIndex, document.getElementById(`partition_${title}`)!, document.getElementById(`container_${title}`)!, 400)
                    }
            }>
                {leftArrow()}
            </button>
            <button className={`${styles.article_scroll} `+ styles.right} id={`right_button_${title}`} onClick={
                ()=>{
                    scrollMethod(1, scrollIndex, document.getElementById(`partition_${title}`)!, document.getElementById(`container_${title}`)!, 400)
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