import { useContext } from 'react';
import styles from './Sidebar.module.scss';

import AppContext  from '../../AppContext';

function Sidebar() {
    const appContext = useContext(AppContext)

    const hidingSidebar = (sidebar: HTMLDivElement) => { 
        sidebar.classList.remove(styles['sidebar--appear']);
        sidebar.classList.add(styles['sidebar--disappear']);
        const timer = setTimeout(appContext.context_sidebar.setter, 500) //timeout number === animation-duration
    }

    return(
    appContext.context_sidebar.visibility ? 
    <div className = {styles.disablingBackground}>
        <aside className={`${styles.sidebar} ${styles['sidebar--appear']}`} id={'sidebar'}>
            <button onClick={()=>hidingSidebar(document.getElementById('sidebar') as HTMLDivElement)}>닫기</button>
        </aside>
    </div> : null
    )
}

export default Sidebar