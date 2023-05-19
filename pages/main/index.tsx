
import React, {lazy,Suspense} from 'react'
import styles from './index.module.scss'
import Partition from '@/components/Partition/Partition'
import Loading from '@/components/Loading/Loading'



// const loadArticles = async(title: string, start: number, limit: number) => {


//     const query = new URLSearchParams(
//         {'_start': `${start}`, '_limit': `${limit}`}
//     )
//     const resource = await fetch('https://aniview-server-chiaf.run.goorm.site/reviewPosts?' + query, {
//         method: 'GET'
//     })
//     // const resource = await fetch("https://animation-view-fnlkc.run.goorm.site/main", {
//     //     method: 'GET'
        
//     // })
//     const res = await resource.json();
//     return {data: [...res], title: title};
    
// }

// interface QueryObject {
//     queryKey: string,
//     queryFn: ()=>Promise<any>
// }

// class QueryObject {
//     constructor(queryKey: string) {
//         this.queryKey = queryKey;
//         this.queryFn = ()=> loadArticles(this.queryKey, 0, 5);
//     }
// }

export async function getServerSideProps() {


    const query = new URLSearchParams(
        {'_start': `${0}`, '_limit': `${10}`}
    )
    const res = await fetch(`https://aniview-server-chiaf.run.goorm.site/reviewPosts?`+ query, {
        method: 'GET'
    });
    // const res = await fetch("https://animation-view-fnlkc.run.goorm.site/main", {
    //     method: 'GET'
    // })
    const data = await res.json();
   
    return { props: { data } };
}

interface DataProps {
    [key: string]: string
}

interface DataArrayProps {
    data: Array<DataProps>
}

interface TitleObject {
    id: number,
    title: string
}
   

function MainPage({data}: DataArrayProps) {

    const titleArr: TitleObject[] = [
        {title: 'Best!', id: 0}, {title: "Best2", id: 1}, {title: "Best3", id: 2}];

    return (
        <>
        <div className={styles.contents}>
            {titleArr.map((titleObj: TitleObject, index: number)=>{

                return (
                    <Partition title={titleObj.title} data={data} key={index} partitionKey={titleObj.id}/>
                )
            })}
        </div>
        </>
    )
}




export default MainPage