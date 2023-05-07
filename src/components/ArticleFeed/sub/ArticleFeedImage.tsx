import styles from './ArticleFeedImage.module.scss';

interface ArticleFeedImageProps {
    url?:string,
}


function ArticleFeedImage({url}:ArticleFeedImageProps) {




    return(
        <figure className = {styles.thumbnail} style={{backgroundImage: `url("https://animation-view-fnlkc.run.goorm.site/images/${url}`}}>
        </figure>
    )
}

export default ArticleFeedImage;