import styles from './PostIntro.module.scss'

interface PostIntroProps {
    title: string,
    photoURL: string
}

function PostIntro({title, photoURL}:PostIntroProps) {
    return (
        <section className = {styles.post_intro} style={{backgroundImage : `url(${photoURL})`}}>
            <div className={styles['post_intro--background']}></div>
            <h2 className= {styles['post_intro--title']}>{title}</h2>
        </section>
    )
}

export default PostIntro;