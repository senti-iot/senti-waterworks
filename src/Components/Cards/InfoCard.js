import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Collapse, IconButton } from '@material-ui/core'
import { ExpandMore } from 'variables/icons'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'
import { ItemG } from 'Components'
import cx from 'classnames'
import { TProvider } from 'Components/Providers/LocalizationProvider'
import cardStyles from 'Styles/cardStyle'

const InfoCard = (props) => {
	const [expanded, setExpanded] = useState(props.expanded ? props.expanded : false)
	const [leftActions, /* setLeftActions */] = useState(false)

	const t = useContext(TProvider)
	const classes = cardStyles()

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}


	// const hasSubheader = (subheader) => subheader ? subheader.toString().length < 200 ? subheader ? subheader : null : null : null

	const { subheader, /* subheaderTitle */ } = props

	// const renderSubHeader = () => {
	// 	return subheader ? subheader.toString().length > 200 ?
	// 		<Fragment>
	// 			<Typography variant={'caption'}>
	// 				{subheaderTitle ? subheaderTitle : null}
	// 			</Typography>
	// 			<Typography>
	// 				{subheader ? subheader : null}
	// 			</Typography>
	// 		</Fragment>
	// 		: null : null

	// }

	const { menuExpand } = props

	const renderTopAction = () => {
		return <ItemG container justifyContent={'flex-end'}>
			{props.topAction}
			{!menuExpand ? null : <IconButton variant={'text'}
				onClick={handleExpandClick}
				aria-expanded={expanded}
				aria-label='Show more'
			>
				<ExpandMore className={classnames(classes.expand, {
					[classes.expandOpen]: expanded,
				})} />
			</IconButton>}
		</ItemG>
	}

	const { title, content, hiddenContent, avatar,
		noAvatar, leftActionContent, color, noRightExpand,
		whiteAvatar, noHeader, dashboard, headerClasses, bodyClasses } = props
	const cardClasses = cx({
		[classes.card]: true,
		[classes.plainCardCalsses]: true,
		[classes['']]: color
	})
	return (
		<Card className={cardClasses}>
			{noHeader ? null : <CardHeader
				action={renderTopAction()}
				avatar={noAvatar ? null : <Avatar aria-label='Avatar' className={classes.avatar + ' ' + (whiteAvatar ? classes.whiteAvatar : "")}>{avatar}</Avatar>}
				title={title}
				disableTypography
				subheader={subheader}
				classes={{
					title: classes.title,
					action: classes.actions,
					subheader: classes.subheader,
					...headerClasses
				}}
			>

			</CardHeader>}
			<CardContent
				classes={{
					...bodyClasses
				}}
				className={classnames(
					{ [classes.dashboard]: dashboard },
					{ [classes.transition]: true },
					{ [classes.contentMedia]: props.noPadding },
					{ [classes.noMargin]: props.noExpand ? false : props.haveMargin ? false : !expanded })}>
				{/* {renderSubHeader()} */}
				{content ? content : null}
			</CardContent>
			{!props.noExpand ?
				<React.Fragment>
					{leftActionContent ? <CardContent classes={{ root: classes.root }}>
						{leftActionContent}
					</CardContent> : null}
					<Collapse in={expanded} timeout='auto' unmountOnExit>
						<CardContent className={classnames(
							{ [classes.contentMedia]: props.noHiddenPadding },
							{ [classes.noPadding]: props.noHiddenPadding ? true : false })} /* classes={{ root: classes.root }} */>
							{hiddenContent ? hiddenContent : null}
						</CardContent>
					</Collapse>
					<CardActions className={classes.actions}>
						{leftActions ? leftActions : null}
						{!noRightExpand ? <Button
							variant={'text'}
							color={'primary'}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label='Show more'
							className={classes.expandPosition}
						>
							{expanded ? t('menus.seeLess') : t('menus.seeMore')}
							<ExpandMore className={classnames(classes.expand, {
								[classes.expandOpen]: expanded,
							})} />
						</Button> : null}
					</CardActions>
				</React.Fragment>
				: null}
		</Card>
	)

}

InfoCard.propTypes = {
	topAction: PropTypes.any,
	content: PropTypes.any,
	avatar: PropTypes.any,
	leftActions: PropTypes.any,
	leftActionContent: PropTypes.any,
	noExpand: PropTypes.bool,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	subheader: PropTypes.any,
	hiddenContent: PropTypes.any,
	noAvatar: PropTypes.any,
	hideFacts: PropTypes.bool,
}

export default InfoCard