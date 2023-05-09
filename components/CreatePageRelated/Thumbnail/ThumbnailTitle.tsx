import React from 'react'
import styles_title from './ThumbnailTitle.module.scss';

interface ThumbnailTitleElementProps {
	style: string,
	tag: string,
	id: string
}

function ThumbnailTitleElement({style, tag, id}:ThumbnailTitleElementProps) {
	const restorePlaceholder = (e:any) => {
		if(e.target?.innerHTML === '') {
			e.target?.classList.remove(`${styles_title['title--focused']}`)
		} else {
			
		}
	}
	const element = React.createElement(
		tag, 
		{className: style,
		 contentEditable: 'true',
		 onFocus: (e:any)=>{
					e.target?.classList.add(`${styles_title['title--focused']}`)
				},
		 onBlur: (e:any)=>{
					restorePlaceholder(e);
				},
		id: id
		}
		)

	return (
		element
	)
	
}

interface ThumbnailTitleProps {
	align: string
}


function ThumbnailTitle({align}: ThumbnailTitleProps) {
	return(
		<div className = {`${styles_title.title} ${styles_title[align]}`} id={`thumbnailTitle`} title={`title_${align}`}>
			<ThumbnailTitleElement style={styles_title['title--main']} tag={'h1'} id='mainTitle'/>
			<ThumbnailTitleElement style={styles_title['title--sub']} tag={'h3'} id="subTitle"/>
		</div>
	)
}

export default ThumbnailTitle;