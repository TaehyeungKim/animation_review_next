import styles from './SidebarProfile.module.scss';
import ProfilePictureComponent from '../Global/ProfilePictureComponent';

function SidebarProfile() {
    return(
        <section className={styles.profile}>
            <ProfilePictureComponent className={styles['profile--picture']}/>
        </section>
    )
}

export default SidebarProfile