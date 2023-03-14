import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styles from './PostCommentList.module.scss'
import ProfilePictureComponent from '../../../../../components/Global/ProfilePictureComponent'
import { moreDot } from '../../../../../icons/icons'
import ButtonComponent from '../../../../../components/Global/ButtonComponent'

interface PostCommentModalProps {
    buttonNode: Element,
    id:number,
    hideModal: ()=>void,
}


function PostCommentModal({buttonNode, id, hideModal}:PostCommentModalProps) {

    const [dotStyle, setDotStyle] = useState<DotStyle>({top: 0, right: 0, position: 'absolute', zIndex: 3});
    const dotDomRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(()=>{
        const { bottom } = dotDomRef.current?.getBoundingClientRect() as DOMRect; 
        const bottomBorder = document.getElementById('postpageContainer')?.getBoundingClientRect().bottom as number
        const modalX = parseFloat(window.getComputedStyle(buttonNode.parentNode as Element).getPropertyValue('padding-right')) + parseFloat(window.getComputedStyle(buttonNode).getPropertyValue('width'));
        if(bottom >= bottomBorder) setDotStyle({...dotStyle, right: modalX, bottom: 0, top: 'initial'})
        else setDotStyle({...dotStyle, right: modalX})
    },[])


    return(<div style={dotStyle as React.CSSProperties} className={styles.modal} ref={dotDomRef} id={`modal_${id}`}>
            <ul className={styles.modalList}>
                <li id={`modal_reply_${id}`}>답글</li>
                <li id={`modal_report_${id}`}>신고</li>
                <li id={`modal_block_${id}`}>차단</li>
            </ul>
           </div>)
}

interface PostCommentProps {
    id: number
}

interface DotStyle {
    right: number,
    position: string,
    zIndex: number,
    top?: number|string,
    bottom?: number|string
}

function PostComment({id}:PostCommentProps) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const showModal = () => setModalVisible(true)
    const hideModal= () => setModalVisible(false);

    // const modalCloseClickEvent = (e:Event, children: HTMLCollection)=> {
    //     const target = e.target as Element;
    //     const targetId = target.getAttribute('id')
    //     const verify = (targetId: string) => {
    //         for(let i = 0; i <children.length; i++) {
    //             if(targetId === children[i].getAttribute('id')) return false;
    //         }
    //         return true;
    //     }
    //     if(targetId !== `modal_${id}` && !verify(targetId as string) && modalVisible) {hideModal()};
    //     console.log(targetId)
    // }

    // useEffect(()=>{
    //     if(modalVisible) {
    //         const children = document.getElementById(`modal_${id}`)?.children as HTMLCollection
    //         console.log(children)
    //         window.addEventListener('click', (e: Event)=>{
    //             modalCloseClickEvent(e, children)
    //         })
    //     }
    // },[modalVisible])
    


    return(
        <li className={styles['list_container--comment']}>
            <ProfilePictureComponent className={styles['comment--profile']}/>
            <div className={styles['comment--content']}>
                <div className={styles['content--info']}>
                    <span className={styles['info--username']}>taehyeungkim98</span>
                    <span className={styles['info--date']}>2023년 2월 12일</span>
                </div>
                <div className = {styles['content--content']}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <ButtonComponent className={styles['comment--more']} children={moreDot()} id={`more_button_${id}`} event={[['onClick', showModal]]}/>
            {modalVisible && <PostCommentModal buttonNode={document.getElementById(`more_button_${id}`) as Element} id={id} hideModal={hideModal}/>}
        </li>
    )
}

interface PostCommentListProps {
    data: Array<any>
}

function PostCommentList({data}:PostCommentListProps) {
    
    return (
    <section className={styles.list}>
        <ul className = {styles.list_container}>
            {data.map((data: any, index: number)=>{return (<PostComment id={index} key={index}/>)})}
        </ul>
    </section>
    )
}
export default PostCommentList