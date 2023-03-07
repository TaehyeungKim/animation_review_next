import styles from './Loading.module.scss';
import loading from '../../images/logo192.png';

function Loading() {
    return(
    <div className={styles.loading}>
            <div className={styles.loading_wrapper}>
                <img className={styles['loading_image']} src={loading}></img>
            </div>
        </div>
    )
}

export default Loading;