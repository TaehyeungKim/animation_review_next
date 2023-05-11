
import React from 'react'
import styles from './index.module.scss'
import Partition from '@/components/Partition/Partition'



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
        {'_start': `${0}`, '_limit': `${5}`}
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
   

function MainPage({data}: DataArrayProps) {

    const titleArr = ['Best!', '추천 게시물', '가장 HOT'];

    return (
        <>
        <div className={styles.contents}>
            {titleArr.map((title: string, index: number)=>{
                return (<Partition title={title} data={data} key={index}/>)
            })}
        </div>
        </>
    )
}

export default MainPage