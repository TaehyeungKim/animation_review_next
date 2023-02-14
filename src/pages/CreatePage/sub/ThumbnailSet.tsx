import {useState, useRef} from 'react';
import styles from './ThumbnailSet.module.scss';
import {imageAdd, trash, leftalign, centeralign} from '../../../icons/icons';
import ThumbnailTitle from './ThumbnailTitle'; 
import ButtonComponent from '../../../components/Global/ButtonComponent';


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
				<ButtonComponent className={styles['thumbnail_optionbar--imageAdd']} children={imageAdd()} event={[['onClick', ()=>{
						imageInp.current?.click();}]]}/>
				<input type="file" accept="image/*" hidden ref={imageInp} onChange = {(e:any)=>{
						updateThumbnail(e);
					}}/>
				<ButtonComponent className={styles['thumbnail_optionbar--imageDelete']} children={trash()} event={[['onClick', ()=>{
						deleteThumbnail();
					}]]}/>
				<ButtonComponent className={styles['thumbnail_optionbar--alignment']} children={titleAlign === 'left' ? leftalign() : centeralign()}/>
			</aside>
		</section>
	)
}

export default ThumbnailSet;