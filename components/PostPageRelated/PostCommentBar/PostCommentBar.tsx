import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from './PostCommentBar.module.scss'
import styles_upper from './PostCommentBarUpper.module.scss';
import styles_below from './PostCommentBarBelow.module.scss';
import ProfilePictureComponent from '@/components/Global/ProfilePictureComponent';
import {likeplus, share, exclamation, write, toggleon, toggleoff} from '@/icons/icons'
import ButtonComponent from '@/components/Global/ButtonComponent'
import { UserContext } from '@/utils/context';
import { LoggedUserInfo } from '@/utils/type';


interface CommentBarUpperProps {
    toggleBar: (arg:boolean)=>void,
    visible: boolean;
}

function CommentBarUpper({toggleBar, visible}:CommentBarUpperProps) {
    
    return(
        <div className={styles_upper['bar_upper']}>
            <ButtonComponent className={styles_upper.like}>
                {likeplus()}
            </ButtonComponent>
            <ButtonComponent className={styles_upper.like}>
                {share()}
            </ButtonComponent>
            <ButtonComponent className={styles_upper.exclamation}>
                {exclamation()}
            </ButtonComponent>
            <ButtonComponent className={styles_upper.hideshowtoggle} event={[['click', ()=>{toggleBar(visible)}]]}>
                {visible ? toggleon() : toggleoff()}
            </ButtonComponent>
        </div>
    )
}

interface CommentBarBelowProps {
    visible:boolean;
    loggedUser: LoggedUserInfo
}

function CommentBarBelow({visible, loggedUser}:CommentBarBelowProps) {

    const container = useRef<HTMLDivElement>(null);

    useEffect(()=>{
    
        !visible ? container?.current?.classList.add(styles_below.hide) : container?.current?.classList.remove(styles_below.hide)
        
    },[visible])
    return(
        <div className={styles_below['bar_down']} ref={container}>
            <ProfilePictureComponent className={styles_below['bar_down--profile']} profileImage={loggedUser.profileImage}/>
            <div className={styles_below['bar_down--comment']}>
                <textarea placeholder={"댓글을 입력해주세요"}></textarea>
            </div>
            <ButtonComponent className={styles_below['bar_down--submit']}>
                 {write()}
            </ButtonComponent>
        </div>
    )
}

function PostCommentBar() {

    const loggedUser = useContext(UserContext)

    const [barVisible, setBarVisible] = useState<boolean>(true);

    const toggleBar = (visible:boolean) => {
        setBarVisible(!visible)
    }
    
    return (
    <div className = {styles.bar}>
        <CommentBarUpper toggleBar={toggleBar} visible={barVisible}/>
        <CommentBarBelow visible={barVisible} loggedUser={loggedUser}/>
    </div>
    )
}
export default PostCommentBar