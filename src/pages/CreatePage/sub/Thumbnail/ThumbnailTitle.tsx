import React from 'react'
import styles_title from './ThumbnailTitle.module.scss';

interface ThumbnailTitleElementProps {
	style: string,
	tag: string
}

function ThumbnailTitleElement({style, tag}:ThumbnailTitleElementProps) {
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
				}
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
		<div className = {`${styles_title.title} ${styles_title[align]}`}>
			<ThumbnailTitleElement style={styles_title['title--main']} tag={'h1'}/>
			<ThumbnailTitleElement style={styles_title['title--sub']} tag={'h3'}/>
		</div>
	)
}

export default ThumbnailTitle;