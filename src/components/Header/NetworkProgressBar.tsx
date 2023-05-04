import {useState, useEffect, useLayoutEffect} from 'react'
import NPObserver from '../Global/NetworkProgressObserver'
import styles from './NetworkProgressBar.module.scss'
import {useIsMutating} from 'react-query'

function NetworkProgressBar() {
    
    const [progressVisible, setProgressVisible] = useState<boolean>(false);

    const isMutating = useIsMutating();

    if(isMutating && !progressVisible) setProgressVisible(true);


    const [percentage, setPercentage] = useState<number>(0);

    const [thumbnailURL, setThumbnailURL] = useState<string>("");

    const {timeStamp, thumbnail} = NPObserver.getNetworkInfo()

    const date = new Date(timeStamp);
    const [year, month, day] = [date.getFullYear(), date.getMonth() +1, date.getDay()];

    useEffect(()=>{
        const interval = setInterval(()=>{
            const {percentage} = NPObserver.getNetworkInfo()
            setPercentage(percentage)
            if(percentage === 100) {
                clearInterval(interval)
            }
        },500)
    },[])

    useEffect(()=>{
        console.log(isMutating)
        const timer = setTimeout(()=>{
            setProgressVisible(false);
            clearTimeout(timer)
        },3000)
    },[isMutating])


    useLayoutEffect(()=>{
        let thumbnailURL: string
        if(thumbnail !== "undefined") {
            thumbnailURL = URL.createObjectURL(thumbnail as File);
            setThumbnailURL(thumbnailURL);
        }

        return(()=>{
            URL.revokeObjectURL(thumbnailURL);
        })
 
    },[])

    if(!progressVisible) {return null}


    return(
        <div className={styles.progressContainer}>
            <figure className={styles['progressContainer--thumbnail']} style={{'backgroundImage': `url(${thumbnailURL})`}}/>
            <section className={styles['progressContainer--infoWrapper']}>
                <section className={styles['progressContainer--articleInfo']}>
                    <span className={styles['progressContainer--articleInfo_title']}>{NPObserver.getNetworkInfo().title}</span>
                    <span className={styles['progressContainer--articleInfo_date']}>{`${year}년 ${month}월 ${day}일`}</span>
                </section>
                <section className={styles['progressContainer--networkProgress']}>
                    <progress className={styles.progressBar}value={percentage} max={100}></progress>
                </section>
            </section>
            
            
        </div>
    )
}

export default NetworkProgressBar