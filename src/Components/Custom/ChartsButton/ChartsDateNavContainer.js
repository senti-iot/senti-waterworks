

import ItemG from 'Components/Containers/ItemG';
import styled from 'styled-components';
import size from 'Styles/themes/mediaQueries';


const ChartsDateNavContainer = styled(ItemG)`
	margin: 16px 32px;
	@media ${size.down.lg} {
		margin: 8px 16px;
	}

`


export default ChartsDateNavContainer