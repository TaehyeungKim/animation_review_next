import styles from './CreatePage.module.scss'
import { useEffect, useReducer } from 'react';
import Header from '../../components/Header/Header';
import ThumbnailSet from './sub/Thumbnail/ThumbnailSet';
import WriteContent from './sub/WriteContent'
import ButtonComponent from '../../components/Global/ButtonComponent';
import {Thumbnail, Body, CreateData, CreateAction} from './CreateDataInterface';


function CreatePage() {


	const reducer = (state: CreateData, action: CreateAction) => {
		switch(action.type) {
			case 'thumbnail':
				return {
					...state, thumbnail: action.thumbnail
				}
			case 'body':
				return {
					...state, body: action.body
				}
			default:
				return {...state}
		}
	}

	const [data, dispatch] = useReducer(reducer, {thumbnail: undefined, body: undefined})

	const dispatchThumbnail = (action: CreateAction) => dispatch({type: 'thumbnail', thumbnail: {...action.thumbnail as Thumbnail}})
	const dispatchBody = (action: CreateAction) => dispatch({type: 'body', body: {...action.body as Body}})


	
	const dispatchData = () => {
		const thumbnailImgFile = ((document.getElementById('thumbnailImage') as HTMLInputElement).files as FileList)[0]
		const thumbnailData = {
			type: 'thumbnail',
			thumbnail: {
				title: {
					main: document.getElementById('mainTitle')?.textContent as string,
					sub: document.getElementById('subTitle')?.textContent as string
				},
				align: document.getElementById('thumbnailTitle')?.title as string,
				image: thumbnailImgFile
		}}
		dispatchThumbnail(thumbnailData)
	}

	useEffect(()=>{
		console.log(data);
	},[data])

	return(
		<>
		<Header/>
		<div className={styles.contents}>
			<ThumbnailSet/>
			<WriteContent/>
		</div>
		<ButtonComponent className={styles.submit} children={<>제출</>} event={[['click', ()=>{
			dispatchData()
		}]]}/> 
		</>
	)
}

export default CreatePage;