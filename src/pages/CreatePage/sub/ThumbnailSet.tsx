import {useState, useRef} from 'react';
import styles from './ThumbnailSet.module.scss';
import {imageAdd} from '../../../icons/icons';

function ThumbnailSet() {
	
	const imageInp = useRef<HTMLInputElement>(null);
	return(
		<section className={styles.thumbnail}>
			<aside className = {styles.thumbnail_optionbar}>
				<button className={styles['thumbnail_optionbar--imageAdd']} onClick={()=>{
						imageInp.current?.click();
					}}>{imageAdd()}</button>
				<input type="file" accept="image/*" hidden ref={imageInp}/>
			</aside>
		</section>
	)
}

export default ThumbnailSet;