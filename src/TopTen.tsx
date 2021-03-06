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
        axiosInstance.get('/rating/topTen').then(res => {
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
                            <React.Fragment key={`${item.id}_fragment`}>
                                <Grid key={`${item.id}_grid_num`} item md={4}
                                      style={{textAlign: "center", width: "100%"}}>
                                    <Typography variant="h1" component="h2" gutterBottom key={`${item.id}_typo`}>
                                        {tileData.indexOf(item) + 1}.
                                    </Typography>
                                    <Rating
                                        key={`${item.id}_rating`}
                                        name="simple-controlled"
                                        readOnly
                                        value={Math.round(_scores[tileData.indexOf(item)].avg_score)}
                                    />

                                </Grid>

                                <Grid key={`${item.id}_grid`} item md={6} style={{width: "100%"}}>
                                    <CustomCard key={`${item.id}_card`} {...item} />
                                </Grid>
                                <Grid key={`${item.id}_spacer`} item md={2}>
                                </Grid>
                            </React.Fragment>
                        ))
                    }
                </Grid>
            </Container>
    );
}