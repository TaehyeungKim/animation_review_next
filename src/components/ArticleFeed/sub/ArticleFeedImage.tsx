import {useEffect, useState, useRef} from 'react'
import styles from './ArticleFeedImage.module.scss';
import logo from '../../../images/logo192.png'

const imageLoader = async(reset:(resource: any)=>void) => {
    try {
        const resource = await fetch('https://api.unsplash.com/photos/random?client_id=9GxiSwj0LRM2ik3I5IfIcgyOVljvN1xwgnK2yjqSJ1s&count=1', {
            method: 'GET',
        })
        const res = await resource.json();
        console.log(res)
        reset(res);
    } catch(e) {
        console.log(e);
    }

}

function ArticleFeedImage() {

    const [imageResource, setImageResource] = useState<any>(null)


    const updateImageResource = (resource: any) => {
        setImageResource(resource)
    }

    useEffect(()=>{
        if(!imageResource) {
            imageLoader(updateImageResource)
        } else {

        }
        
    },[imageResource])

    return(
        <figure className = {styles.thumbnail} style={!imageResource ? {backgroundImage: 'none'} : {backgroundImage: `url(${imageResource[0].urls.thumb})`}}>
            {!imageResource ? <img className = {styles.default} src={logo}/> : null}
        </figure>
    )
}

export default ArticleFeedImage;