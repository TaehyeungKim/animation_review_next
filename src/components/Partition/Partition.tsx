import {useEffect, useState} from 'react'
import styles from './Partition.module.scss'
import ArticleFeed from '../ArticleFeed/ArticleFeed'

interface PartitionProps {
    title: string;
}

const loadArticles = async(title: string, start: number, limit: number, settingResources: (resources: Array<JSON>)=>void) => {

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
    const [resources, setResources] = useState<Array<JSON>>([]);

    const settingResources = (resources: Array<JSON>) => {
        setResources(resources)
    }

    useEffect(()=>{
        loadArticles(title, 0, 5, settingResources)
    },[])
    return(
        <section className={styles.partition}>
            <h3 className={styles.partition_title}>{title}</h3>
            <div className={styles.article_container}>
                {resources.length > 0 ? resources.map((data:JSON)=>{
                    return (<ArticleFeed data={data}/>)
                }): null}
            </div>
        </section>
    )
}

export default Partition;