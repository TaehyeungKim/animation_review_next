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

    const scrollMethod = (arg: number, container: HTMLElement, partition: HTMLElement) => {
        if((container.offsetWidth - partition.offsetWidth) / 400 > scrollIndex.current+arg) {
            container.removeAttribute('style')
            container.classList.remove(`${styles[`scroll_level_${scrollIndex.current}`]}`)
            container.classList.add(`${styles[`scroll_level_${scrollIndex.current + arg}`]}`)
            scrollIndex.current = scrollIndex.current + arg
            console.log((container.offsetWidth - partition.offsetWidth) / 400, scrollIndex.current)
        }
         else {
            container.setAttribute('style', `transform: translateX(${-(container.offsetWidth - partition.offsetWidth)}px)`)
        }

    } 

    

    useEffect(()=>{
        loadArticles(title, 0, 5, settingResources)
        
    },[])
    return(
        <section className={styles.partition} id={'partition'}>
            <button className={styles.article_scroll} id={styles.left} onClick={
                ()=>{
                    scrollMethod(-1, document.getElementById('container')!, document.getElementById('partition')!)
                    }
            }>
                {leftArrow()}
            </button>
            <button className={styles.article_scroll} id={styles.right} onClick={
                ()=>{scrollMethod(1, document.getElementById('container')!, document.getElementById('partition')!)}
            }>
                    {rightArrow()}
            </button>
            <h3 className={styles.partition_title}>{title}</h3>
            <div className={styles.article_container} id={'container'}>
                {resources.length > 0 ? resources.map((data:any)=>{
                    return (<ArticleFeed data={data}/>)
                }): null}
               
            </div>
        </section>
    )
}

export default Partition;