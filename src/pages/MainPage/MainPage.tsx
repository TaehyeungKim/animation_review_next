import styles from './MainPage.module.scss'
import Header from '../../components/Header/Header'
import Partition from '../../components/Partition/Partition'

function MainPage() {
    return (
        <>
        <Header/>
        <div className={styles.contents}>
            <Partition title={'Best!'}/>
            {/* <Partition title={'추천 게시물'}/>
            <Partition title={'가장 HOT'}/> */}
        </div>
        </>
    )
}

export default MainPage;