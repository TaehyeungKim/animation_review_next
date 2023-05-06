import styles from './ArticleFeedImage.module.scss';

interface ArticleFeedImageProps {
    url?:string,
    image?: File|string
}


function ArticleFeedImage({url, image}:ArticleFeedImageProps) {

    if(typeof(image) === 'object') {
        const tempURL = URL.createObjectURL(image as File);
    }


    return(
        <figure className = {styles.thumbnail} style={{backgroundImage: `url(${url})`}}>
        </figure>
    )
}

export default ArticleFeedImage;