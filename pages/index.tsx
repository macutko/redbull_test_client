import {Avatar, Chip, Grid} from '@material-ui/core';
import React, {useState} from 'react';
import ImageGrid from '../src/ImageGrid';
import Layout from '../src/Layout';
import TopTen from "../src/TopTen";


export default function Index() {
    const [topTen, setTopTen] = useState<boolean>(false)


    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Chip variant="outlined" color="primary" label={"Top"} avatar={<Avatar>10</Avatar>}
                          onClick={() => setTopTen(!topTen)}/>
                    <Chip color="primary" label={"Infinite scroll"} onClick={() => setTopTen(!topTen)}/>


                </Grid>
                <Grid item xs={12}>
                    {topTen ? <TopTen/> : <ImageGrid/>}
                </Grid>

            </Grid>
        </Layout>
    );
}
