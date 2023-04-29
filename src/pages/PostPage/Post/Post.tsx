
import styles from './Post.module.scss'
import PostIntro from './PostRelated/PostIntro/PostIntro';
import PostContent from './PostRelated/PostContent/PostContent';
import PostCommentBar from './PostRelated/PostCommentBar/PostCommentBar'
import PostCommentList from './PostRelated/PostCommentList/PostCommentList';
import createElementByRecursion from './PostHtmlParser'
import { useEffect } from 'react';

interface PostProps {
    data: any;
}



function Post({data}:PostProps) {
    let commentData = [{id: 1}, {id: 2}, {id: 3}]

    useEffect(()=>{
        console.log(createElementByRecursion(document.getElementById('postpageContainer')?.innerHTML as string))
    },[])

    return (
        <div className = {styles.container} id={'postpageContainer'}>
            <PostIntro photoURL={data.content.thumbnailImage} title={data.content.mainTitle}/>
            <PostContent/>
            <PostCommentBar/>
            <PostCommentList data={commentData}/>
        </div>
    )
}

export default Post;