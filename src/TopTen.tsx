import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {axiosInstance} from "../lib/axiosInstance";
import {getContentData, IContent} from "../lib/utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 500,
            height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);
type ResponseTen = {
    _id: string,
    score: number
}

export default function TopTen() {
    const classes = useStyles();
    const [tileData, setTileData] = useState<IContent[]>([])
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axiosInstance.get('rating/topTen').then(res => {
            setLoading(false)
            setScores(res.data)
            setTileData(res.data.map((item: ResponseTen) => getContentData(item._id)))
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }, [])


    return (
        <div className={classes.root}>
            <GridList cellHeight={250} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                    <ListSubheader component="div">December</ListSubheader>
                </GridListTile>
                {loading ? null :
                    (
                        tileData.map((tile) => (
                            <GridListTile key={tile.id}>

                                {tile.mediaType === "video" ? <img src={tile.previewUrl} alt={tile.title}/> :
                                    <img src={tile.contentUrl} alt={tile.title}/>}
                                <a href={`/content/${tile.id}`}>
                                    <GridListTileBar
                                        title={tile.title}
                                        subtitle={<span>by: {tile.source}</span>}
                                        actionIcon={

                                            <IconButton aria-label={`info about ${tile.title}`}
                                                        className={classes.icon}>
                                                <InfoIcon/>
                                            </IconButton>

                                        }
                                    />
                                </a>

                            </GridListTile>


                        ))
                    )}
            </GridList>
        </div>
    );
}