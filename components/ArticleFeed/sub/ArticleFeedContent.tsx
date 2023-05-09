import styles from './ArticleFeedContent.module.scss'
import {like as likeIcon, view}  from '../../../icons/icons'

interface ArticleFeedContent {
    title: string,
    like: number,
    watch: number
}

function ArticleFeedContent({title, like, watch}:ArticleFeedContent) {
    return(
        <section className={styles.feed_content}>
            <h3 className={styles.title}>{title}</h3>
            <div className = {styles.likewatch_container}>
                <span>{likeIcon()} {like}</span>
                <span>{view()} {watch}</span>
            </div>
        </section>
    )
}

export default ArticleFeedContent;