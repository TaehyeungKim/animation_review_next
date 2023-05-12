import React from 'react'
import styles from './ArticleFeed.module.scss'
import Link from 'next/link'
// import {Link} from 'react-router-dom'
import ArticleFeedHeader from './sub/ArticleFeedHeader'
import ArticleFeedImage from './sub/ArticleFeedImage'
import ArticleFeedContent from './sub/ArticleFeedContent'

interface ArticleFeedProps {
    data: any
}

function ArticleFeed({data}: ArticleFeedProps) {
    return(
        <Link href={
            {
                pathname: `/post/${encodeURIComponent(data.id)}`
            }
        
        } prefetch={false}>
        <article className={styles.article_feed}>
            <ArticleFeedHeader/>
            <ArticleFeedImage url={data.thumbnailImage}/>
            <ArticleFeedContent title={data.maintitle} like={50000} watch={120000} />
        </article>
        </Link>
    )
}

export default ArticleFeed