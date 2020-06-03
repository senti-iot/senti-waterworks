

import { useContext } from 'react'
import { SProvider } from 'Hooks/useSnackbar/SnackbarProvider'

const useSnackbar = () => {
	const s = useContext(SProvider)
	return s
}

export default useSnackbar
