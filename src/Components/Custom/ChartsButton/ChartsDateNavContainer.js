

import ItemG from 'Components/Containers/ItemG';
import styled from 'styled-components';
import size from 'Styles/themes/mediaQueries';


const ChartsDateNavContainer = styled(ItemG)`
	width: auto;
	margin: 16px 32px;
	@media ${size.down.md} {
		margin: 8px 8px;
	}

`


export default ChartsDateNavContainer