import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { gInstallation } from 'Redux/data'

const Installation = () => {
	//Hooks
	const dispatch = useDispatch()
	const params = useParams()
	//Redux
	const installation = useSelector(s => s.data.installation)
	//State
	//Const

	//useCallbacks

	//useEffects
	useEffect(() => {
		let getData = async () => await dispatch(await gInstallation(params.uuid))
		getData()
		return () => {
		}
	}, [params.uuid, dispatch])
	//Handlers

	return (
		<div>
			{JSON.stringify(installation)}
		</div>
	)
}

export default Installation
