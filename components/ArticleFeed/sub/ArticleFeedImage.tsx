import { Suspense } from 'react';
import styles from './ArticleFeedImage.module.scss';
import Loading from '@/components/Loading/Loading'

interface ArticleFeedImageProps {
    url?:string,
}


function ArticleFeedImage({url}:ArticleFeedImageProps) {

    // --deploy
    // const imageUrl = "https://animation-view-fnlkc.run.goorm.site/images/" + url;
    
    // dev
    const imageUrl = url




    return(
        <Suspense fallback={<Loading/>}>
        <figure className = {styles.thumbnail} style={{backgroundImage: `url(${imageUrl})`}}>
        </figure>
        </Suspense>
    )
}

export default ArticleFeedImage;