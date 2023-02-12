import styles from './PostCommentList.module.scss'

function PostComment() {
    return(
        <li className={styles['list_container--comment']}>
            
        </li>
    )
}

function PostCommentList() {
    
    return (
    <section className={styles.list}>
        <ul className = {styles.list_container}>
            <PostComment/>
        </ul>
    </section>
    )
}
export default PostCommentList