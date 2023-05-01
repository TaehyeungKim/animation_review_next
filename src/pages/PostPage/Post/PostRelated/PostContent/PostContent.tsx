import styles from './PostContent.module.scss'
import {useEffect} from 'react';
import createElementByRecursion from '../../../../../components/Global/PostHtmlParser';
import {PostSpaceMapping} from '../../../../../components/Global/MapTextNodeWithIndex';

interface PostContentProps {
    paragraphInfoJsonArray: any
}

function PostContent({paragraphInfoJsonArray}: PostContentProps) {

    useEffect(()=>{
        const contentWrapper = document.getElementById('contentWrapper') as HTMLElement;
        paragraphInfoJsonArray.forEach((info: any)=>{
            const templateNode = createElementByRecursion(info.paragraphTemplate);
            PostSpaceMapping(templateNode, info.textSpacemap);
            templateNode.setAttribute('class', styles['content_paragraph'])
            contentWrapper.appendChild(templateNode)
        })
    },[])
    
    return (
    <section className = {styles.content}>
        <div className = {styles.content_wrapper} id='contentWrapper'>
            {/* <p className= {styles['content_paragraph']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum nisi sapien, sed volutpat nisl tristique vitae. Morbi nec ante consectetur elit vehicula pulvinar porttitor quis sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat non dui ut auctor. Nam ut imperdiet ex, sit amet efficitur turpis. Quisque aliquam sapien ac arcu interdum aliquam. Vivamus lobortis odio nec ex cursus semper eget eget eros. Morbi laoreet, libero sit amet hendrerit condimentum, diam leo consectetur arcu, at vulputate nulla augue in ligula. Morbi a risus quam. Sed eu mi diam. Pellentesque ac malesuada nisl. Praesent consectetur ultricies magna, non feugiat sem accumsan consectetur. Pellentesque id lacus eget leo bibendum bibendum non ut eros.
            </p>
            <p className= {styles['content_paragraph']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum nisi sapien, sed volutpat nisl tristique vitae. Morbi nec ante consectetur elit vehicula pulvinar porttitor quis sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat non dui ut auctor. Nam ut imperdiet ex, sit amet efficitur turpis. Quisque aliquam sapien ac arcu interdum aliquam. Vivamus lobortis odio nec ex cursus semper eget eget eros. Morbi laoreet, libero sit amet hendrerit condimentum, diam leo consectetur arcu, at vulputate nulla augue in ligula. Morbi a risus quam. Sed eu mi diam. Pellentesque ac malesuada nisl. Praesent consectetur ultricies magna, non feugiat sem accumsan consectetur. Pellentesque id lacus eget leo bibendum bibendum non ut eros.
            </p>
            <p className= {styles['content_paragraph']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum nisi sapien, sed volutpat nisl tristique vitae. Morbi nec ante consectetur elit vehicula pulvinar porttitor quis sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat non dui ut auctor. Nam ut imperdiet ex, sit amet efficitur turpis. Quisque aliquam sapien ac arcu interdum aliquam. Vivamus lobortis odio nec ex cursus semper eget eget eros. Morbi laoreet, libero sit amet hendrerit condimentum, diam leo consectetur arcu, at vulputate nulla augue in ligula. Morbi a risus quam. Sed eu mi diam. Pellentesque ac malesuada nisl. Praesent consectetur ultricies magna, non feugiat sem accumsan consectetur. Pellentesque id lacus eget leo bibendum bibendum non ut eros.
            </p>
            <p className= {styles['content_paragraph']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum nisi sapien, sed volutpat nisl tristique vitae. Morbi nec ante consectetur elit vehicula pulvinar porttitor quis sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat non dui ut auctor. Nam ut imperdiet ex, sit amet efficitur turpis. Quisque aliquam sapien ac arcu interdum aliquam. Vivamus lobortis odio nec ex cursus semper eget eget eros. Morbi laoreet, libero sit amet hendrerit condimentum, diam leo consectetur arcu, at vulputate nulla augue in ligula. Morbi a risus quam. Sed eu mi diam. Pellentesque ac malesuada nisl. Praesent consectetur ultricies magna, non feugiat sem accumsan consectetur. Pellentesque id lacus eget leo bibendum bibendum non ut eros.
            </p>
            <p className= {styles['content_paragraph']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum nisi sapien, sed volutpat nisl tristique vitae. Morbi nec ante consectetur elit vehicula pulvinar porttitor quis sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat non dui ut auctor. Nam ut imperdiet ex, sit amet efficitur turpis. Quisque aliquam sapien ac arcu interdum aliquam. Vivamus lobortis odio nec ex cursus semper eget eget eros. Morbi laoreet, libero sit amet hendrerit condimentum, diam leo consectetur arcu, at vulputate nulla augue in ligula. Morbi a risus quam. Sed eu mi diam. Pellentesque ac malesuada nisl. Praesent consectetur ultricies magna, non feugiat sem accumsan consectetur. Pellentesque id lacus eget leo bibendum bibendum non ut eros.
            </p> */}
        </div>
            
    </section>
    )
}
export default PostContent