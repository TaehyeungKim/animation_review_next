import {useState, useRef} from 'react';
import styles from './ThumbnailSet.module.scss';
import {imageAdd, trash, leftalign, centeralign} from '../../../icons/icons';
import ThumbnailTitle from './ThumbnailTitle'; 


function ThumbnailSet() {
	const [thumbnail, setThumbnail] = useState<string|null>(null);
	const [titleAlign, setTitleAlign] = useState<string>('left');
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
				<button className = {styles['thumbnail_optionbar--alignment']}>
				{titleAlign === 'left' ? leftalign() : centeralign()}
				</button>
			</aside>
		</section>
	)
}

export default ThumbnailSet;