import { useQuery } from 'react-query';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import Post from './Post/Post';
import styles from './PostPage.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

function PostPage() {


    
    const location = window.location.href;
    const id = location.split("/").pop() as string;


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
            return {content: contentRes, photo: photoRes}

        } catch(e) {
            console.log(e);
        }
    }

    const {status, data, error} = useQuery(`post_${id}`, ()=>loadPost(id))


    if(status === 'loading') return (<Loading></Loading>)

    return(
        <>
        <Header/>
        <Sidebar/>
        {data ? 
        <div className = {styles.contents}>
            <Post data={data}/>
        </div>
        : null}
        
        </>
    )
}

export default PostPage;