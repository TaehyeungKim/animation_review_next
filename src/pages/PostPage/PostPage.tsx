import {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Post from './Post/Post';
import styles from './PostPage.module.scss';

function PostPage() {

    const [postData, setPostData] = useState<any>(null);

    const updataPostData = (data: any) => {
        setPostData(data);
    }

    const location = window.location.href;
    const id = location.split("/").pop();

    const loadPost = async(id:string) => {
        try {
            const contentResource = await fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
            method: "GET"
        })
            const photoResource = await fetch("https://jsonplaceholder.typicode.com/photos/" + id, {
                method: "GET"
            })
            const contentRes = await contentResource.json();
            const photoRes = await photoResource.json();

            updataPostData({content: contentRes, photo: photoRes});
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        loadPost(id as string);
    },[])
    return(
        <>
        <Header></Header>
        {postData ? 
        <div className = {styles.contents}>
            <Post data={postData}/>
        </div>
        : null}
        
        </>
    )
}

export default PostPage;