import React, { useEffect, useState } from 'react'

//import { useNavigate } from 'react-router-dom'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'
// import logo from '../../images/logo192.png'
import { search } from '../../icons/icons'
import {notification, setting, list} from '../../icons/icons'
import ButtonComponent from '../Global/ButtonComponent'
import Sidebar from '../Sidebar/Sidebar'
import { createPortal } from 'react-dom'
import NetworkProgressBar from './NetworkProgressBar'
import logo from '@/public/logo192.png'




function Header() {

    const router = useRouter();

    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible)

    

    return (
        <nav className={styles.nav}>
            <div className = {styles.nav_container}>

                <div className={styles.logo} onClick={()=>router.push('/main')}>
                    <img src={'/logo192.png'} alt="logo"/>
                </div>
                <div className={styles.title} onClick={()=>router.push('/main')}>
                    <h3>Aniview</h3>
                </div>

                <div className={styles.search}>
                    <input placeholder="검색어를 입력하세요" id='search-input'></input>
                    <ButtonComponent className={styles.search_icon}>
                        {search()}
                    </ButtonComponent>

                </div>
                <div className={styles.username}>
                    <h4>taehyeungkim98</h4>
                </div>
                <ButtonComponent className={styles.icon} id={styles['icon-notification']}>
                    {notification()}
                </ButtonComponent>
                <ButtonComponent className={styles.icon} id={styles['setting']} event={[['click', toggleSidebar]]}>
                    {list()}
                </ButtonComponent>
            </div>
            {sidebarVisible && createPortal(<Sidebar toggle={toggleSidebar}/>,document.getElementById('__next') as Element)}
            <NetworkProgressBar/>
        </nav>
    )
}

export default Header