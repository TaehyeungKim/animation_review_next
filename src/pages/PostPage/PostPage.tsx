import { useQuery } from 'react-query';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import Post from './Post/Post';
import styles from './PostPage.module.scss';

function PostPage() {


    
    const location = window.location.href;
    const id = location.split("/").pop() as string;


    const loadPost = async(id:string) => {
        try {
            const contentResource = await fetch("http://localhost:4000/reviewPosts/" + id, {
            method: "GET"
        })
            const contentRes = await contentResource.json();
            return {content: contentRes}

        } catch(e) {
            console.log(e);
        }
    }

    const {status, data, error} = useQuery(`post_${id}`, ()=>loadPost(id))


    if(status === 'loading') return (<Loading></Loading>)

    return(
        <>
        <Header/>
        {data ? 
        <div className = {styles.contents}>
            <Post data={data}/>
        </div>
        : null}
        
        </>
    )
}

export default PostPage;