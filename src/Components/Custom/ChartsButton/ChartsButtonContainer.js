

import ItemG from 'Components/Containers/ItemG';
import styled from 'styled-components';
import size from 'Styles/themes/mediaQueries';


const ChartsButtonContainer = styled(ItemG)`
	margin: 24px 24px 0px 24px;
	@media ${size.down.md} {
		margin: 0px;
	}

`


export default ChartsButtonContainer