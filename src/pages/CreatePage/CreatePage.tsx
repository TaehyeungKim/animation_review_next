import styles from './CreatePage.module.scss'
import Header from '../../components/Header/Header';
import ThumbnailSet from './sub/Thumbnail/ThumbnailSet';
import WriteContent from './sub/WriteContent'

function CreatePage() {
	return(
		<>
		<Header/>
		<div className={styles.contents}>
			<ThumbnailSet/>
			<WriteContent/>
		</div>
		</>
	)
}

export default CreatePage;