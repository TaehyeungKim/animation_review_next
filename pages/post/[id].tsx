import React from 'react';
import { useQuery } from 'react-query';
import Loading from '@/components/Loading/Loading';
import styles from './index.module.scss';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';

const PostWithNoSSR = dynamic(()=>import('@/components/PostPageRelated/Post'))


function PostPage() {



    const router = useRouter();
    
    const id = router.query.id;


    const loadPost = async(id:string) => {
        try {
            const contentResource = await fetch('https://aniview-server-chiaf.run.goorm.site/reviewPosts/' + id, {
            method: "GET"
        })
            const contentRes = await contentResource.json();
            return {content: contentRes}

        } catch(e) {
            console.log(e);
        }
    }

    const {status, data, error} = useQuery(`post_${id}`, ()=>loadPost(id as string))



    if(status === 'loading') return (<Loading></Loading>)

    return(
        <>
        {data ? 
        <div className = {styles.contents}>
            {/* <Post data={data}/> */}
            <PostWithNoSSR data={data}/>
        </div>
        : null}
        
        </>
    )
}

export default PostPage;