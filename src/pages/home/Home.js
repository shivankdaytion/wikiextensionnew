import { userSelector } from 'features/UserSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baseSelector, getBaseHomeElement, listBase } from '../../features/BaseSlice'

const Home = ({ active }) => {
    const { basehome, base } = useSelector(baseSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        if (base?.id) dispatch(getBaseHomeElement({ baseId: base?.id, page: 1 }))
	}, [base?.id, dispatch])
	return <div>{JSON.stringify(basehome)}</div>
}
export default Home