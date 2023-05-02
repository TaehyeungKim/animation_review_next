import {useState, useEffect} from 'react'
import NPObserver from '../Global/NetworkProgressObserver'

function NetworkProgressBar() {

    const [percentage, setPercentage] = useState<number>(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            const {percentage} = NPObserver.getNetworkInfo()
            setPercentage(percentage)
            if(percentage === 100) clearInterval(interval)
        },500)
    },[])

    return(
        <div>{percentage}</div>
    )
}

export default NetworkProgressBar