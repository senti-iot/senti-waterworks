import styled from 'styled-components'
import { T } from 'Components'
import size from 'Styles/themes/mediaQueries'


const ChartTitle = styled(T)`
	font-weight: 600;
	font-size: 1.75em;
	letter-spacing: 1.5px;
	@media ${size.down.md} {
		font-size: 1.25em;
	}
`

export const ChartSmallTitle = styled(T)`
	font-weight: 600;
	font-size: 1.50em;
	letter-spacing: 1.5px;
	@media ${size.down.md} {
		font-size: 1em;
	}
`
export default ChartTitle