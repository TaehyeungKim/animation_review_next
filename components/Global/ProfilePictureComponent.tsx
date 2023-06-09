import styles from './ProfilePictureComponent.module.scss'

interface ProfilePictureComponentProps {
    className: string,
    profileImage?: string
    event?: Array<Array<any>>,
    id?: string
}

function ProfilePictureComponent({className, event, id, profileImage}: ProfilePictureComponentProps) {
    
    return (
        <div className = {className}>
            <figure className = {styles.profilePicture} style={profileImage ? {backgroundImage: `url(${profileImage})`}:undefined}></figure>
        </div>
    )
}
export default ProfilePictureComponent