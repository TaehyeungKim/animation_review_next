import styles from './CreatePage.module.scss'
import Header from '../../components/Header/Header';
import ThumbnailSet from './sub/Thumbnail/ThumbnailSet';
import WriteContent from './sub/WriteContent'
import ButtonComponent from '../../components/Global/ButtonComponent';
import {CreateData} from './CreateDataInterface';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios'


function CreatePage() {

	const navigate = useNavigate();

	const sleep = () => {
		return new Promise(resolve=>setTimeout(resolve, 3000))
	}

	const mutation = useMutation({
		mutationFn: async (data: FormData) => {
			for(const value of data.values()) console.log(value)
			//return axios.post('http://localhost:4000/reviewPosts', data)
			return axios.post("https://animation-view-fnlkc.run.goorm.site/create", data, {
				headers: {'Content-Type': 'multipart/form-data'}
			})
			//https://animation-view-fnlkc.run.goorm.site
		},
		mutationKey: 'create',
		onError: (e)=>{console.log(e)},
		//onMutate: ()=>{navigate('/main')}
		onSuccess: ()=>navigate('/main')
	})
	
	const dispatchData = () => {
		const thumbnailImgFile = ((document.getElementById('thumbnailImage') as HTMLInputElement).files as FileList)[0]

		const contentArea = document.getElementById('contentArea') as HTMLElement;
		document.getElementById('texteditpalette')?.remove();

		for(let i = 0; i < contentArea.childElementCount; i++) contentArea.children[i].removeAttribute('class')

		const formData = new FormData();

		formData.append('mainTitle', document.getElementById('mainTitle')?.textContent as string);
		formData.append('subTitle', document.getElementById('subTitle')?.textContent as string);
		formData.append('titleAlign', document.getElementById('thumbnailTitle')?.title as string);
		formData.append('thumbnailImage', thumbnailImgFile);
		formData.append('bodyContent', contentArea.innerHTML);

		mutation.mutate(formData)

		// const createData = {
		// 	id: 171,
		// 	thumbnail: {
		// 		title: {
		// 			main: document.getElementById('mainTitle')?.textContent as string,
		// 			sub: document.getElementById('subTitle')?.textContent as string
		// 		},
		// 		align: document.getElementById('thumbnailTitle')?.title as string,
		// 		image: thumbnailImgFile
		// 	},
		// 	body: {
		// 		content: contentArea.innerHTML
		// 	}
		// }
		// mutation.mutate(createData)
	}


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