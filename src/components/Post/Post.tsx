
import styles from './Post.module.scss'
import PostIntro from './PostRelated/PostIntro/PostIntro';
import PostContent from './PostRelated/PostContent/PostContent';
import PostCommentBar from './PostRelated/PostCommentBar/PostCommentBar'

interface PostProps {
    data: any;
}

function Post({data}:PostProps) {
    return (
        <div className = {styles.container}>
            <PostIntro photoURL={data.photo.url} title={data.content.title}/>
            <PostContent/>
            <PostCommentBar/>
        </div>
    )
}

export default Post;