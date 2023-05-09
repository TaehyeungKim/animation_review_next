import React, {useState, useRef} from 'react';
import styles from './ThumbnailSet.module.scss';
import {imageAdd, trash, leftalign, centeralign, rightalign} from '@/icons/icons';
import ThumbnailTitle from './ThumbnailTitle'; 
import ButtonComponent from '@/components/Global/ButtonComponent';


function ThumbnailSet() {
	const [thumbnail, setThumbnail] = useState<string|null>(null);
	const [titleAlignIndex, setTitleAlignIndex] = useState<number>(0);
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
		} 
	}

	const titleAlignOrder = [{dir: 'left', image: leftalign()}, {dir: 'center', image: centeralign()}, {dir: 'right', image: rightalign()}]

	const changeTitleAlign = (currentIndex: number, titleAlignOrder: Array<any>) => {
		
		switch(currentIndex) {
			case titleAlignOrder.length -1:
				setTitleAlignIndex(0);
				break;
			default:
				setTitleAlignIndex(currentIndex + 1);
		}
	}
	
	return(
		<section className={styles.thumbnail} style={thumbnail ? {backgroundImage: `url(${thumbnail})`} : undefined}>
			<ThumbnailTitle align={titleAlignOrder[titleAlignIndex].dir}/>
			<aside className = {styles.thumbnail_optionbar}>
				<ButtonComponent className={styles['thumbnail_optionbar--imageAdd']} event={[['click', ()=>{
						imageInp.current?.click();}]]}>{imageAdd()}</ButtonComponent>
				<input type="file" accept="image/*" hidden ref={imageInp} onChange = {(e:any)=>{
						updateThumbnail(e);
					}} id={'thumbnailImage'}/>
				<ButtonComponent className={styles['thumbnail_optionbar--imageDelete']} event={[['click', ()=>{
						deleteThumbnail();
					}]]}>{trash()}</ButtonComponent>
				<ButtonComponent className={styles['thumbnail_optionbar--alignment']} event={
					[['click', ()=>{changeTitleAlign(titleAlignIndex, titleAlignOrder)}]]
				}>{titleAlignOrder[titleAlignIndex].image}</ButtonComponent>
			</aside>
		</section>
	)
}

export default ThumbnailSet;