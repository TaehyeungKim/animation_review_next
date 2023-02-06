import styles from './ArticleFeedContent.module.scss'

interface ArticleFeedContent {
    title: string,
    like: number,
    watch: number
}

function ArticleFeedContent({title, like, watch}:ArticleFeedContent) {
    return(
        <section className={styles.feed_content}>
            <h3 className={styles.title}>{title}</h3>
            <span>좋아요: {like}</span>
            <span>조회수: {watch}</span>
        </section>
    )
}

export default ArticleFeedContent;