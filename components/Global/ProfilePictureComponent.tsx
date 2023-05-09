import styles from './ProfilePictureComponent.module.scss'

interface ProfilePictureComponentProps {
    className: string,
    event?: Array<Array<any>>,
    id?: string
}

function ProfilePictureComponent({className, event, id}: ProfilePictureComponentProps) {
    
    return (
        <div className = {className}>
            <figure className = {styles.profilePicture}></figure>
        </div>
    )
}
export default ProfilePictureComponent