import { useQueries } from 'react-query'
import styles from './MainPage.module.scss'
import Header from '../../components/Header/Header'
import Partition from '../../components/Partition/Partition'
import Loading from '../../components/Partition/Loading/Loading'


const loadArticles = async(title: string, start: number, limit: number) => {


    const query = new URLSearchParams(
        {'_start': `${start}`, '_limit': `${limit}`}
    )
    const resource = await fetch('https://jsonplaceholder.typicode.com/photos?' + query, {
        method: 'GET'
    })
    const res = await resource.json();
    return {data: [...res], title: title};
    
}

interface QueryObject {
    queryKey: string,
    queryFn: ()=>Promise<any>
}

class QueryObject {
    constructor(queryKey: string) {
        this.queryKey = queryKey;
        this.queryFn = ()=> loadArticles(this.queryKey, 0, 5);
    }
}


function MainPage() {

    let titleArr = ['Best!', '추천 게시물', '가장 HOT'];
    const result = useQueries([...titleArr.map((title:string)=>{return new QueryObject(title)})])

    for(let i = 0; i < result.length; i++) {
        if(!result[i].data) return (<Loading></Loading>)
    }

    return (
        <>
        <Header/>
        <div className={styles.contents}>
            {result.map((res: any, index: number)=>{
                return (<Partition title={res.data.title} data={res.data.data} status={res.status} error = {res.error} key={index}/>)
            })}
        </div>
        </>
    )
}

export default MainPage;