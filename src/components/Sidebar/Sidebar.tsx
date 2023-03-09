import { useContext } from 'react';
import styles from './Sidebar.module.scss';

import AppContext  from '../../AppContext';

function Sidebar() {
    const appContext = useContext(AppContext)

    const hidingSidebar = (sidebar: HTMLDivElement) => { 
        const sidebarCssAnimDuration = window.getComputedStyle(sidebar).getPropertyValue('animation-duration') as string;
        const animDurationWithRegExp = sidebarCssAnimDuration.match(/[^s]+/i);
        const animDurationFloat = animDurationWithRegExp ? parseFloat(animDurationWithRegExp[0]) : 0; 
        sidebar.classList.remove(styles['sidebar--appear']);
        sidebar.classList.add(styles['sidebar--disappear']);
        const timer = setTimeout(appContext.context_sidebar.setter, animDurationFloat * 1000) //timeout number === animation-duration
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