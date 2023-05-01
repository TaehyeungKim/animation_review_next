
import styles from './Post.module.scss'
import PostIntro from './PostRelated/PostIntro/PostIntro';
import PostContent from './PostRelated/PostContent/PostContent';
import PostCommentBar from './PostRelated/PostCommentBar/PostCommentBar'
import PostCommentList from './PostRelated/PostCommentList/PostCommentList';
import createElementByRecursion from '../../../components/Global/PostHtmlParser'
import { PostSpaceMapping } from '../../../components/Global/MapTextNodeWithIndex';
import { useEffect } from 'react';

interface PostProps {
    data: any;
}



function Post({data}:PostProps) {
    let commentData = [{id: 1}, {id: 2}, {id: 3}]

    const paragraphInfoJsonArray = JSON.parse(data.content.paragraphContents);

    useEffect(()=>{

        

        
        // console.log(templateNode)

        
    },[])

    return (
        <div className = {styles.container} id={'postpageContainer'}>
            <PostIntro photoURL={data.content.thumbnailImage} title={data.content.mainTitle}/>
            <PostContent paragraphInfoJsonArray={paragraphInfoJsonArray}/>
            <PostCommentBar/>
            <PostCommentList data={commentData}/>
        </div>
    )
}

export default Post;