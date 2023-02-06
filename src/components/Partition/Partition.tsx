import styles from './Partition.module.scss'
import ArticleFeed from '../ArticleFeed/ArticleFeed'

interface PartitionProps {
    title: string;
}

function Partition({title}:PartitionProps) {
    return(
        <section className={styles.partition}>
            <h3>{title}</h3>
            <div className={styles.article_container}>
                <ArticleFeed/>
            </div>
        </section>
    )
}

export default Partition;