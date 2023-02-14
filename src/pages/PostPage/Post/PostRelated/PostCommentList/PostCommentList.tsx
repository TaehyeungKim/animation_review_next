import styles from './PostCommentList.module.scss'
import ProfilePictureComponent from '../../../../../components/Global/ProfilePictureComponent'
import { moreDot } from '../../../../../icons/icons'
import ButtonComponent from '../../../../../components/Global/ButtonComponent'

function PostComment() {
    return(
        <li className={styles['list_container--comment']}>
            <div className={styles['comment--profile']}>
                <ProfilePictureComponent/>
            </div>
            <div className={styles['comment--content']}>
                <div className={styles['content--info']}>
                    <span className={styles['info--username']}>taehyeungkim98</span>
                    <span className={styles['info--date']}>2023년 2월 12일</span>
                </div>
                <div className = {styles['content--content']}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <ButtonComponent className={styles['comment--more']} children={moreDot()}/>
        </li>
    )
}

function PostCommentList() {
    
    return (
    <section className={styles.list}>
        <ul className = {styles.list_container}>
            <PostComment/>
            <PostComment/>
            <PostComment/>
            <PostComment/>
            <PostComment/>
        </ul>
    </section>
    )
}
export default PostCommentList