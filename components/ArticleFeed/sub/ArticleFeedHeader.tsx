import React from 'react';
import styles from './ArticleFeedHeader.module.scss';
// import logo from '../../../images/logo192.png'
import ProfilePictureComponent from '@/components/Global/ProfilePictureComponent';

interface BadgeContainerProps {
    badge: Array<any>;
}

function BadgeContainer({badge}: BadgeContainerProps) {
    return(
        <div className={styles.badge_container}>
            <figure className={styles.badge}>
                <img src={badge[0].src}></img>
            </figure>
        </div>
    )
}

function ArticleFeedHeader() {
    return(
        <header className={styles.header}>
            <div className={styles.user}>
                <ProfilePictureComponent className = {styles['user_profileContainer']}/>
                <h4 className={styles.username}>taehyeungkim98</h4>
            </div>
            <BadgeContainer badge = {[{src: "logo192.png"}]}/>
        </header>
    )
}

export default ArticleFeedHeader;