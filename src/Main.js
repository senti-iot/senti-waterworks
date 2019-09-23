import React from 'react'
import { Link, Router } from '@reach/router';

const Hello = () => <div>Hello</div>
const World = () => <div>World</div>
function Main() {
	return (
		<div>

			<div>
				<Link to={''} >Main </Link>
				<Link to={'hello'} >Hello </Link>
				<Link to={'world'} >World </Link>
			</div>
			<Router>
				<Hello path={'hello'} />
				<World path={'world'} />
			</Router>

		</div>
	)
}

export default Main
