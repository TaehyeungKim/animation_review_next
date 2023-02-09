
import styles from './Post.module.scss'
import PostIntro from './PostRelated/PostIntro/PostIntro';

interface PostProps {
    data: any;
}

function Post({data}:PostProps) {
    return (
        <div className = {styles.container}>
            <PostIntro photoURL={data.photo.url} title={data.content.title}/>
        </div>
    )
}

export default Post;