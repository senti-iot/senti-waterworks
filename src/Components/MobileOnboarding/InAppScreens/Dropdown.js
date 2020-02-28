/* eslint-disable indent */
import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Typography, makeStyles, Container } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { headerColor } from '../../../Styles/mainStyles'

const useStyles = makeStyles(theme => ({
  root: { // to enable border radius work correctly
    borderRadius: 8,
    overflow: 'hidden'
  },
  contents: {
    flexDirection: 'column',
    padding: 0
  },
  summary: {
    background: headerColor,
    color: '#fff',
    height: 64 // this is the height when it's expanded
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  listItemText: {
    fontSize: 19,
    paddingLeft: 8,
    color: theme.boxBackground
  },
  icon: {
    fontSize: 30,
    color: '#fff'
  }
}))

// I think the accordion should also have a little shadow, according to prototypes
// the categories should also have a darker shade of blue
const Dropdown = props => {
  const classes = useStyles()

  const categories = ['Vandforbrug', 'Temperatur', 'Gennemstrømning', 'Aflæsninger']

  return (
    <Container>
      <div className={classes.root}>
        <ExpansionPanel className={classes.panel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.icon} />} className={classes.summary}>
            <Typography variant="h6">Vælg kategori</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className={classes.contents}>
            <List component="nav" className={classes.list}>

              {categories.map((item, index) => (
                <ListItem key={index} divider button>
                  <ListItemText>
                    <Typography className={classes.listItemText}>{item}</Typography>
                  </ListItemText>
                </ListItem>
              ))}

            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </Container>
  )
}

export default Dropdown