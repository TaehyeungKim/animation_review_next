import { useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import logo from '../../images/logo192.png'
import search_icon from '../../icons/search.svg'
import {notification, setting, list} from '../../icons/icons'
import ButtonComponent from '../Global/ButtonComponent'

import AppContext from '../../AppContext'



function Header() {

    const navigate = useNavigate();

    const appContext = useContext(AppContext);

    useEffect(()=>{console.log(appContext.context_sidebar.visibility)},[])

    return (
        <nav className={styles.nav}>
            <div className = {styles.nav_container}>
                <div className={styles.logo} onClick={()=>navigate('/main')}>
                    <img src={logo}/>
                </div>
                <div className={styles.title} onClick={()=>navigate('/main')}>
                    <h3>Aniview</h3>
                </div>

                <div className={styles.search}>
                    <input placeholder="검색어를 입력하세요"></input>
                    <div className={styles.search_icon}>
                        <img src={search_icon}/>
                    </div>
                </div>
                <div className={styles.username}>
                    <h4>taehyeungkim98</h4>
                </div>
                <ButtonComponent className={styles.icon} children={notification()} id={styles['icon-notification']}/>
                <ButtonComponent className={styles.icon} children={list()} id={styles['setting']} event={[['onClick', appContext.context_sidebar.show]]}/>
            </div>
        </nav>
    )
}

export default Header