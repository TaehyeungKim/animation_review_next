import styles from './CreatePage.module.scss'
import Header from '../../components/Header/Header';
import ThumbnailSet from './sub/ThumbnailSet';
import WriteContent from './sub/WriteContent'
import Sidebar from '../../components/Sidebar/Sidebar';

function CreatePage() {
	return(
		<>
		<Header/>
		<Sidebar/>
		<div className={styles.contents}>
			<ThumbnailSet/>
			<WriteContent/>
		</div>
		</>
	)
}

export default CreatePage;