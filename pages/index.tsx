import {Grid} from '@material-ui/core';
import React, {useState} from 'react';
import ImageGrid from '../src/ImageGrid';
import Layout from '../src/Layout';
import TopTen from "../src/TopTen";


export default function Index() {
    const [topTen, setTopTen] = useState<boolean>(false)
    return (
        <Layout setTopTen={() => setTopTen(!topTen)} topTen={topTen}>
            <div style={{padding: 20}}>
                <Grid container spacing={5}>

                    <Grid item xs={12}>
                        {topTen ? <TopTen/> : <ImageGrid/>}
                    </Grid>

                </Grid>
            </div>
        </Layout>
    );
}
