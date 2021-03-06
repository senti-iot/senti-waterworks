

import { useContext } from 'react'
import { TProvider } from 'Components/Providers/LocalizationProvider'

const useLocalization = () => {
	const t = useContext(TProvider)
	return t
}

export default useLocalization
