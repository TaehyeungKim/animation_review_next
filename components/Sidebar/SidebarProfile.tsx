import { useContext } from 'react';
import styles from './SidebarProfile.module.scss';
import ProfilePictureComponent from '../Global/ProfilePictureComponent';
import { UserContext } from '@/utils/context';
import { UserBadge } from '@/utils/type';

interface BadgeDisplayProps {
    list: Array<any>
}

function BadgeDisplay({list}: BadgeDisplayProps) {
    return (
        <section className = {styles.badgeDisplay}>
            {list.map((value: UserBadge, index: number)=>{return (
                <div className={styles['badgeDisplay--container']} key={index}>
                    <ProfilePictureComponent className={styles['badgeDisplay--badge']}/>
                    {/* <figcaption className={styles['badgeDisplay--caption']}>{value.name}</figcaption> */}
                </div>
                
            )})}
        </section>
    )
}

function SidebarProfile() {

    const loggedUser = useContext(UserContext)

    return(
        <section className={styles.profile}>
            <ProfilePictureComponent className={styles['profile--picture']} profileImage={loggedUser.profileImage}/>
            <h4 className={styles['profile--name']}>{loggedUser.id}</h4>
            <BadgeDisplay list={loggedUser.badge}/>
        </section>
    )
}

export default SidebarProfile