import React from 'react'
import HistoryGraph from '../components/HistoryGraph'
import Header from '../components/Header'
import ToggleTab from '../components/ToggleTab'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/routine/history.scss'
import { finRoutinesActionsMD } from '../redux/async/routine'

const History = () => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(finRoutinesActionsMD())
    }, [])
    return (
        <>
            <Header name="통계" />
            <ToggleTab
                firstValue={'액션'}
                secondValue={'루틴'}
                select={status}
            />
            <section className="history-container">
                <HistoryGraph />
            </section>
        </>
    )
}

export default History
