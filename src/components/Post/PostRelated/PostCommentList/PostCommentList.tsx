import styles from './PostCommentList.module.scss'
import ProfilePictureComponent from '../../../Global/ProfilePictureComponent'
import { moreDot } from '../../../../icons/icons'

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
            <div className={styles['comment--more']}>
                {moreDot()}
            </div>
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