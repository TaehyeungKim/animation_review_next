import React from 'react';
import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';

const PostWithNoSSR = dynamic(()=>import('@/components/PostPageRelated/Post'))

interface PostDataObject {
    [key: string]: string
}

interface PostData {
    json: PostDataObject
}



export const getServerSideProps: GetServerSideProps = async(context) => {

    //dev
    // const url = `https://aniview-server-chiaf.run.goorm.site/reviewPosts/${context.query.id}`
    
    //deploy
    const url = 'https://animation-view-fnlkc.run.goorm.site/post/';
    const data = await fetch(url , {method: 'GET'});
    const json = await data.json();

    return {props: {json}}
}


function PostPage({json}:PostData) {

    return(
        <>
        {json ? 
        <div className = {styles.contents}>
            <PostWithNoSSR data={json}/>
        </div>
        : null}
        
        </>
    )
}



export default PostPage;