import styles from './MainPage.module.scss'
import Header from '../../components/Header/Header'
import Partition from '../../components/Partition/Partition'

function MainPage() {
    return (
        <>
        <Header/>
        <div className={styles.contents}>
            <Partition title={'Best!'}/>
        </div>
        </>
    )
}

export default MainPage;