import styles from './ArticleFeed.module.scss'
import ArticleFeedHeader from './sub/ArticleFeedHeader'
import ArticleFeedImage from './sub/ArticleFeedImage'
import ArticleFeedContent from './sub/ArticleFeedContent'

function ArticleFeed() {
    return(
        <article className={styles.article_feed}>
            <ArticleFeedHeader/>
            <ArticleFeedImage/>
            <ArticleFeedContent title={'테스트용 게시글'} like={50000} watch={120000} />
        </article>
    )
}

export default ArticleFeed