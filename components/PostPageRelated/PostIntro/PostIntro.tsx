import styles from './PostIntro.module.scss'

interface PostIntroProps {
    title: string,
    photoURL: string
}

function PostIntro({title, photoURL}:PostIntroProps) {

    const imageUrl = "https://animation-view-fnlkc.run.goorm.site/images/" + photoURL

    return (
        // <section className = {styles.post_intro} style={{backgroundImage : `url(${photoURL})`}}>
        <section className = {styles.post_intro} style={{backgroundImage : `url(${imageUrl})`}}>
            <div className={styles['post_intro--background']}></div>
            <h2 className= {styles['post_intro--title']}>{title}</h2>
            <h5 className= {styles['post_intro--userid']}><span>by</span>&nbsp;taehyeungkim98</h5>
        </section>
    )
}

export default PostIntro;