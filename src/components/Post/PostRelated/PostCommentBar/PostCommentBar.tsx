import { useState, useEffect, useRef } from 'react';
import styles from './PostCommentBar.module.scss'
import styles_upper from './PostCommentBarUpper.module.scss';
import styles_below from './PostCommentBarBelow.module.scss';
import {likeplus, share, exclamation, toggledown, toggleup, write} from '../../../../icons/icons'

interface CommentBarUpperProps {
    toggleBar: (arg:boolean)=>void,
    visible: boolean;
}

function CommentBarUpper({toggleBar, visible}:CommentBarUpperProps) {
    return(
        <div className={styles_upper['bar_upper']}>
            <button className={styles_upper.like}>{likeplus()}</button>
            <button className={styles_upper.share}>{share()}</button>
            <button className={styles_upper.exclamation}>{exclamation()}</button>
            <button className={styles_upper.hideshowtoggle} onClick={()=>{
                toggleBar(visible)
            }}>{visible ? toggledown() : toggleup()}</button>            
        </div>
    )
}

interface CommentBarBelowProps {
    visible:boolean;
}

function CommentBarBelow({visible}:CommentBarBelowProps) {

    const container = useRef<HTMLDivElement>(null);

    useEffect(()=>{
    
        !visible ? container?.current?.classList.add(styles_below.hide) : container?.current?.classList.remove(styles_below.hide)
        
    },[visible])
    return(
        <div className={styles_below['bar_down']} ref={container}>
            <div className={styles_below['bar_down--profile']}>
                <figure className={styles_below['profile']}></figure>
            </div>
            <div className={styles_below['bar_down--comment']}>
                <textarea placeholder={"댓글을 입력해주세요"}></textarea>
            </div>
            <button className={styles_below['bar_down--submit']}>
                {write()}
            </button>
        </div>
    )
}

function PostCommentBar() {

    const [barVisible, setBarVisible] = useState<boolean>(true);

    const toggleBar = (visible:boolean) => {
        setBarVisible(!visible)
    }
    
    return (
    <div className = {styles.bar}>
        <CommentBarUpper toggleBar={toggleBar} visible={barVisible}/>
        <CommentBarBelow visible={barVisible}/>
    </div>
    )
}
export default PostCommentBar