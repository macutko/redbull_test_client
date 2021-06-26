import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {axiosInstance} from "../lib/axiosInstance";
import {getContentData, IContent} from "../lib/utils";

const useStyles = makeStyles(() =>
    createStyles({
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);
type ResponseTen = {
    _id: string,
    avg_score: number
}

export default function TopTen() {
    const classes = useStyles();
    const [tileData, setTileData] = useState<IContent[]>([])
    const [_scores, setScores] = useState<ResponseTen[]>([])
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

        <GridList cellHeight={250}>
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
                                            <p>{_scores[tileData.indexOf(tile)].avg_score}</p>
                                            <InfoIcon/>
                                        </IconButton>

                                    }
                                />
                            </a>

                        </GridListTile>


                    ))
                )}
        </GridList>

    );
}