import styles from './CreatePage.module.scss'
import Header from '../../components/Header/Header';
import ThumbnailSet from './sub/ThumbnailSet';

function CreatePage() {
	return(
		<>
		<Header/>
		<div className={styles.contents}>
			<ThumbnailSet/>
		</div>
		</>
	)
}

export default CreatePage;