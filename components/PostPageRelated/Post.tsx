
import styles from './Post.module.scss'
import PostIntro from '@/components/PostPageRelated/PostIntro/PostIntro';
import PostContent from '@/components/PostPageRelated/PostContent/PostContent';
import PostCommentBar from '@/components/PostPageRelated/PostCommentBar/PostCommentBar'
import PostCommentList from '@/components/PostPageRelated/PostCommentList/PostCommentList';

import React, { useEffect } from 'react';

interface PostProps {
    data: any;
}



function Post({data}:PostProps) {
    const commentData = [{id: 1}, {id: 2}, {id: 3}]

    const paragraphInfoJsonArray = JSON.parse(data.paragraphContents);

    useEffect(()=>{

        console.log(data)

        
    },[])

    return (
        <div className = {styles.container} id={'postpageContainer'}>
            <PostIntro photoURL={data.thumbnailImage} title={data.mainTitle}/>
            <PostContent paragraphInfoJsonArray={paragraphInfoJsonArray}/>
            <PostCommentBar/>
            <PostCommentList data={commentData}/>
        </div>
    )
}

export default Post;