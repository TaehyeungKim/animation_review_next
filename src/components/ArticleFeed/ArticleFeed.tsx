import styles from './ArticleFeed.module.scss'
import ArticleFeedHeader from '../ArticleFeed/sub/ArticleFeedHeader'

function ArticleFeed() {
    return(
        <article className={styles.article_feed}>
            <ArticleFeedHeader/>
        </article>
    )
}

export default ArticleFeed