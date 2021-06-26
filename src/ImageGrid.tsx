import { GridList, GridListTile, GridListTileBar, IconButton, ListSubheader, makeStyles } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import React from "react";
import content from './content.json';

const useStyles = makeStyles(() => ({
    gridList: {
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const ImageGrid = () => {
    const classes = useStyles();

    return (
        <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">December</ListSubheader>
            </GridListTile>

            {content.map((tile) => (
                <GridListTile key={tile.id}>
                    {
                        tile.mediaType === "image" ?
                            <img src={tile.contentUrl} alt={tile.title} loading={"lazy"} />
                            :
                            <video controls preload="none" poster={tile.previewUrl} >
                                <source src={tile.contentUrl} />
                            </video>
                    }
                    <GridListTileBar
                        title={tile.title}
                        subtitle={<span>by: {tile.source}</span>}
                        actionIcon={
                            <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </GridListTile>
            ))}
        </GridList>
    )
}
export default ImageGrid;