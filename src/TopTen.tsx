import React, {useEffect, useState} from 'react';
import {axiosInstance} from "../lib/axiosInstance";
import {getContentData, IContent} from "../lib/utils";
import CustomCard from "./CustomCard";
import {Container, Grid, Typography} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

type ResponseTen = {
    _id: string,
    avg_score: number
}

export default function TopTen(): JSX.Element {

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
        loading ? <div/> :
            <Container>
                <Grid container spacing={3}>
                    {
                        tileData.map((item: IContent) => (
                            <>
                                <Grid key={`${item.id}_grid_num`} item xs={4}
                                      style={{textAlign: "center"}}>
                                    <Typography variant="h1" component="h2" gutterBottom>
                                        {tileData.indexOf(item) + 1}.
                                    </Typography>
                                    <Rating
                                        name="simple-controlled"
                                        readOnly
                                        value={_scores[tileData.indexOf(item)].avg_score}
                                    />

                                </Grid>

                                <Grid key={`${item.id}_grid`} item xs={6}>
                                    <CustomCard key={`${item.id}_card`} {...item} />
                                </Grid>
                                <Grid key={`${item.id}_spacer`} item xs={2} >
                                </Grid>
                            </>
                        ))
                    }
                </Grid>
            </Container>
    );
}