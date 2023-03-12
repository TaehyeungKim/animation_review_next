import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './PostCommentList.module.scss'
import ProfilePictureComponent from '../../../../../components/Global/ProfilePictureComponent'
import { moreDot } from '../../../../../icons/icons'
import ButtonComponent from '../../../../../components/Global/ButtonComponent'

interface PostCommentModalProps {
    x: number,
    y: number
}

function PostCommentModal({x, y}:PostCommentModalProps) {
    return(<div style={{left: x, top: y}} className={styles.modal}>this is modal</div>)
}

interface PostCommentProps {
    id: number
}

interface DotPos {
    x: number,
    y: number
}

function PostComment({id}:PostCommentProps) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const dotRef = useRef<DotPos>({x: 0, y: 0});

    const showModal = (e: Event) =>{
        const target = e.target as Element
        const parentElement = target.parentNode as Element
        dotRef.current = {x: parentElement.getBoundingClientRect().x + window.scrollX, y: parentElement.getBoundingClientRect().y + window.scrollY}
        setModalVisible(true);
    }


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
            {modalVisible && createPortal(<PostCommentModal x={dotRef.current.x} y={dotRef.current.y}/>,document.body)}

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