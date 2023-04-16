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
		mutationFn: async (data: CreateData) => {
			await sleep();
			return axios.post('http://localhost:4000/reviewPosts', data)
		},
		mutationKey: 'create',
		onMutate: ()=>{navigate('/main')}
	})
	
	const dispatchData = () => {
		const thumbnailImgFile = ((document.getElementById('thumbnailImage') as HTMLInputElement).files as FileList)[0]

		const contentArea = document.getElementById('contentArea') as HTMLElement;
		document.getElementById('texteditpalette')?.remove();

		for(let i = 0; i < contentArea.childElementCount; i++) contentArea.children[i].removeAttribute('class')


		const createData = {
			id: 170,
			thumbnail: {
				title: {
					main: document.getElementById('mainTitle')?.textContent as string,
					sub: document.getElementById('subTitle')?.textContent as string
				},
				align: document.getElementById('thumbnailTitle')?.title as string,
				image: thumbnailImgFile
			},
			body: {
				content: contentArea.innerHTML
			}
		}
		mutation.mutate(createData)
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