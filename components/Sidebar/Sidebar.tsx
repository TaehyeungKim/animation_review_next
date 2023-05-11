import React, { useEffect } from 'react';
import styles from './Sidebar.module.scss';
import SidebarProfile from './SidebarProfile';

import { close } from '@/icons/icons';
import ButtonComponent from '@/components/Global/ButtonComponent';
import {useRouter} from 'next/router'
import Link from 'next/link'


interface SidebarProps {
    toggle: ()=>void;
}


function Sidebar({toggle}: SidebarProps) {

    let timer: NodeJS.Timeout

    const hidingSidebar = (sidebar: HTMLDivElement) => { 
        const sidebarCssAnimDuration = window.getComputedStyle(sidebar).getPropertyValue('animation-duration') as string;
        const animDurationWithRegExp = sidebarCssAnimDuration.match(/[^s]+/i);
        const animDurationFloat = animDurationWithRegExp ? parseFloat(animDurationWithRegExp[0]) : 0; 
        sidebar.classList.remove(styles['sidebar--appear']);
        sidebar.classList.add(styles['sidebar--disappear']);
        timer = setTimeout(toggle, animDurationFloat * 1000) //timeout number === animation-duration
    }

    const router = useRouter();

    const navigateToCreate = () => {
        toggle();
        router.push('/create');
    }


    useEffect(()=>{
        return(()=>{
            clearTimeout(timer)})
    },[])


    return( 
    <div className = {styles.disablingBackground}>
        <aside className={`${styles.sidebar} ${styles['sidebar--appear']}`} id={'sidebar'}>
            <ButtonComponent className={styles['sidebar--close']} event={[['click', ()=>hidingSidebar(document.getElementById('sidebar') as HTMLDivElement)]]}>
                {close()}
            </ButtonComponent>
            <SidebarProfile/>
            {/* <ButtonComponent className={styles['sidebar--write']} event={[['click', navigateToCreate]]}>
                <p className={styles.write}>글쓰기</p>
            </ButtonComponent> */}
            <ButtonComponent className={styles['sidebar--write']} event={[['click', navigateToCreate]]}>
                <p className={styles.write}>글쓰기</p>
            </ButtonComponent>
        </aside>
    </div>
    )
}

export default Sidebar