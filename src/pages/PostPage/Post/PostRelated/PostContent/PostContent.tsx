import styles from './PostContent.module.scss'
import {useEffect, useState} from 'react';
import createElementByRecursion from '../../../../../components/Global/PostHtmlParser';
import {PostSpaceMapping} from '../../../../../components/Global/MapTextNodeWithIndex';

interface PostContentProps {
    paragraphInfoJsonArray: any
}

function PostContent({paragraphInfoJsonArray}: PostContentProps) {


    useEffect(()=>{
        const contentWrapper = document.getElementById('contentWrapper') as HTMLElement;
        if(contentWrapper.childElementCount === 0) { //for diabling double effect --> no need when deployed
            paragraphInfoJsonArray.forEach((info: any)=>{
            const templateNode = createElementByRecursion(info.paragraphTemplate);
            PostSpaceMapping(templateNode, info.textSpacemap);
            templateNode.setAttribute('class', styles['content_paragraph'])
            contentWrapper.appendChild(templateNode);
        })
        }
    },[])
    
    return (
    <section className = {styles.content}>
        <div className = {styles.content_wrapper} id='contentWrapper'>
            
        </div>
            
    </section>
    )
}
export default PostContent