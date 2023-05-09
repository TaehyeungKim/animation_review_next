import styles from './SidebarProfile.module.scss';
import ProfilePictureComponent from '../Global/ProfilePictureComponent';

interface BadgeDisplayProps {
    list: Array<any>
}

function BadgeDisplay({list}: BadgeDisplayProps) {
    return (
        <section className = {styles.badgeDisplay}>
            {list.map((value: any, index: number)=>{return (
                <div className={styles['badgeDisplay--container']} key={index}>
                    <ProfilePictureComponent className={styles['badgeDisplay--badge']}/>
                    <figcaption className={styles['badgeDisplay--caption']}>{value}</figcaption>
                </div>
                
            )})}
        </section>
    )
}

function SidebarProfile() {
    let list = [1,2,3,4,5]
    return(
        <section className={styles.profile}>
            <ProfilePictureComponent className={styles['profile--picture']}/>
            <h4 className={styles['profile--name']}>taehyeungkim98</h4>
            <BadgeDisplay list={list}/>
        </section>
    )
}

export default SidebarProfile