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
    

    useEffect(()=>{
        loadArticles(title, 0, 5, settingResources)
    },[])
    return(
        <section className={styles.partition}>
            <button className={styles.article_scroll} id={styles.left} onClick={
                ()=>{
                    document.getElementById('container')?.setAttribute('id', `${styles[`scroll_level_${scrollIndex.current + 1}`]}`)
                    scrollIndex.current =+ 1}
            }>
                {leftArrow()}
            </button>
            <button className={styles.article_scroll} id={styles.right}>
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