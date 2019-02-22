import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getEvents, isEventsReady } from '../selectors'
import Icon from './Icon'
import titleIcon from '../icons/vivid-angle-top-left.svg'
import theme from '../style/theme'
import Event from './Event'

const Events = ({ classes, ready, events }) => (
  <div className={classes.container}>
    <h3 className={classes.title}>
      <Icon className={classes.titleIcon} symbol={titleIcon} />
      Results{ready && `: ${events.length} events found`}
    </h3>
    {!ready &&
      <div className={classes.loaderIconContainer}>
        <img src='/vividIconLoader.gif' alt='Vivid Logo Icon Loader' />
        <h2>Loading ...</h2>
      </div>
    }
    {ready && (
      <div className={classes.tilesWrapper}>
        <div className={classes.tiles}>
          {events.map(event => <Event key={event.id} className={classes.tile} content={event} />)}
        </div>
      </div>
    )}
  </div>
)

const mapStateToProps = (state) => ({
  ready: isEventsReady(state),
  events: getEvents(state)
})

export default compose(
  connect(mapStateToProps),
  injectSheet({
    title: {
      paddingLeft: 20,
      position: 'relative'
    },
    titleIcon: {
      position: 'absolute',
      left: 0,
      top: 5
    },
    tilesWrapper: {
      margin: [0, 'auto'],
      maxWidth: theme.maxTileWidth,
      '@media (min-width: 768px)': {
        maxWidth: theme.maxTileWidth * 2 + theme.gutter
      },
      '@media (min-width: 1200px)': {
        maxWidth: theme.maxTileWidth * 3 + theme.gutter * 2
      }
    },
    tiles: {
      '@media (min-width: 768px)': {
        marginLeft: -theme.gutter / 2,
        marginRight: -theme.gutter / 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      }
    },

    tile: {
      margin: [0, 'auto', theme.gutter],
      maxWidth: theme.maxTileWidth,
      '@media (min-width: 768px)': {
        marginLeft: theme.gutter / 2,
        marginRight: theme.gutter / 2,
        width: `calc(50% - ${theme.gutter}px)`
      },
      '@media (min-width: 1200px)': {
        width: `calc(${100 / 3}% - ${theme.gutter}px)`
      }
    },
    loaderIconContainer: {
      display: 'grid',
      justifyItems: 'center'
    }
  })
)(Events)
