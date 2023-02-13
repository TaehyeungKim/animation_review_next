import {useState, useRef} from 'react';
import styles from './ThumbnailSet.module.scss';
import styles_title from './ThumbnailTitle.module.scss';
import {imageAdd, trash} from '../../../icons/icons';



function ThumbnailTitle() {
	
	const restorePlaceholder = (e:any) => {
		if(e.target?.innerHTML === '') {
			e.target?.classList.remove(`${styles_title['title--focused']}`)
		} else {
			
		}
	}
	return(
		<div className = {styles_title.title}>
			<h1 className={styles_title['title--main']} contentEditable = 'true' onFocus={(e:any)=>{
					e.target?.classList.add(`${styles_title['title--focused']}`);
				}} onBlur = {(e:any)=>{
					restorePlaceholder(e);
				}}></h1>
			<h3 className={styles_title['title--sub']} contentEditable = 'true'></h3>
		</div>
	)
}

function ThumbnailSet() {
	const [thumbnail, setThumbnail] = useState<string|null>(null);
	const imageInp = useRef<HTMLInputElement>(null);
	
	const updateThumbnail = (e:any) => {
		const targetFile = e.target?.files[0];
		const tempURL = URL.createObjectURL(targetFile);
		setThumbnail(tempURL);
		 
	}
	const deleteThumbnail = () => {
		if(imageInp.current) {
			imageInp.current.value = '';
			setThumbnail(null);
			console.log(imageInp.current?.files)
		} else {console.log('no image')}
	}
	
	return(
		<section className={styles.thumbnail} style={thumbnail ? {backgroundImage: `url(${thumbnail})`} : undefined}>
			<ThumbnailTitle/>
			<aside className = {styles.thumbnail_optionbar}>
				<button className={styles['thumbnail_optionbar--imageAdd']} onClick={()=>{
						imageInp.current?.click();
					}}>{imageAdd()}</button>
				<input type="file" accept="image/*" hidden ref={imageInp} onChange = {(e:any)=>{
						updateThumbnail(e);
					}}/>
				<button className = {styles['thumbnail_optionbar--imageDelete']} onClick = {()=>{
						deleteThumbnail();
					}}>{trash()}</button>
			</aside>
		</section>
	)
}

export default ThumbnailSet;