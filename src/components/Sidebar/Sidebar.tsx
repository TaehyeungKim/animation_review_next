import { useContext, useEffect } from 'react';
import styles from './Sidebar.module.scss';
import SidebarProfile from './SidebarProfile';

import { close } from '../../icons/icons';
import AppContext  from '../../AppContext';
import ButtonComponent from '../Global/ButtonComponent';

function Sidebar() {
    const appContext = useContext(AppContext);

    let timer: NodeJS.Timeout

    const hidingSidebar = (sidebar: HTMLDivElement) => { 
        const sidebarCssAnimDuration = window.getComputedStyle(sidebar).getPropertyValue('animation-duration') as string;
        const animDurationWithRegExp = sidebarCssAnimDuration.match(/[^s]+/i);
        const animDurationFloat = animDurationWithRegExp ? parseFloat(animDurationWithRegExp[0]) : 0; 
        sidebar.classList.remove(styles['sidebar--appear']);
        sidebar.classList.add(styles['sidebar--disappear']);
        timer = setTimeout(appContext.context_sidebar.setter, animDurationFloat * 1000) //timeout number === animation-duration
    }


    useEffect(()=>{
        return(()=>clearTimeout(timer))
    })


    return(
    appContext.context_sidebar.visibility ? 
    <div className = {styles.disablingBackground}>
        <aside className={`${styles.sidebar} ${styles['sidebar--appear']}`} id={'sidebar'}>
            <ButtonComponent className={styles['sidebar--button']} event={[['onClick', ()=>hidingSidebar(document.getElementById('sidebar') as HTMLDivElement)]]} children={close()}/>
            <SidebarProfile/>
            
        </aside>
    </div> : null
    )
}

export default Sidebar