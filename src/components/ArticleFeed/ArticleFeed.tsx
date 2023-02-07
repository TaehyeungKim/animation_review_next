import styles from './ArticleFeed.module.scss'
import ArticleFeedHeader from './sub/ArticleFeedHeader'
import ArticleFeedImage from './sub/ArticleFeedImage'
import ArticleFeedContent from './sub/ArticleFeedContent'

interface ArticleFeedProps {
    data: any
}

function ArticleFeed({data}: ArticleFeedProps) {
    return(
        <article className={styles.article_feed}>
            <ArticleFeedHeader/>
            <ArticleFeedImage url={data.thumbnailUrl}/>
            <ArticleFeedContent title={data.title} like={50000} watch={120000} />
        </article>
    )
}

export default ArticleFeed