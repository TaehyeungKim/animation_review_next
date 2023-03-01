import {useEffect} from 'react';
import styles from './PartitionIndex.module.scss'

interface PartitionIndexProps {
    totalIdx: number,
    scrollIdx: number,
    title: string
}

function PartitionIndex({totalIdx, scrollIdx, title}: PartitionIndexProps) {

    useEffect(()=>{
        console.log('added', document.getElementById(`${title}_idx_${Math.ceil(scrollIdx)}`))
        document.getElementById(`${title}_idx_${Math.ceil(scrollIdx)}`)?.setAttribute('checked', 'true');
        return(()=>{
            document.getElementById(`${title}_idx_${Math.ceil(scrollIdx)}`)?.removeAttribute('checked');
            console.log('removed')})
    },[scrollIdx])

    return(
        <section className = {styles.index}>
            {(()=>{
                let arr = []
                for(let i=0; i <totalIdx + 1; i++) arr.push(<input className = {styles.index_dot} type="checkbox" readOnly key={i} id={`${title}_idx_${i}`}/>)
                return arr})()}
        </section>
    )
}

export default PartitionIndex