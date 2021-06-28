import {Box, Chip, makeStyles, Typography} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CategoryIcon from '@material-ui/icons/Category';
import React from "react";
import {ReactVideo} from "reactjs-media";
import Layout from "../../src/Layout";
import {getAllContentIds, getContentData, IContent} from "../../lib/utils";
import CustomRating from "../../src/CustomRating";
import ItemAvgRating from "../../src/ItemAvgRating";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: "80vw"
    },
    image: {
        width: 500,
        maxHeight: "100%",
        // backgroundColor: "blue",
        margin: "auto"
    },
    img: {
        maxWidth: '100%',
        maxHeight: '100%',
        height: "auto",
        borderRadius: 5,
    },
    center: {
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
    },
    description: {},
    topicChip: {padding: 5,
    color: theme.palette.error.main}
}));

export default function RBContent(data: IContent) {
    const classes = useStyles()

    return (

        <Layout>
            <Box my={3}>
                <Paper className={classes.paper} elevation={3}>
                    <Grid container spacing={2}
                    >
                        <Grid item xs={12}>
                            <Box mx={20} mt={2} className={classes.image}>
                                {data.mediaType === "video" ?

                                    <ReactVideo
                                        src={data.contentUrl}
                                        poster={data.previewUrl}
                                        primaryColor="red"
                                        className={classes.img}
                                    />
                                    // <video controls preload="none" poster={data.previewUrl} className={classes.img}>
                                    //     <source src={data.contentUrl} />
                                    // </video>

                                    :

                                    <img className={classes.img} alt={data.title} src={data.contentUrl}/>

                                }
                            </Box>

                        </Grid>

                        <Grid item xs={12}
                              className={classes.center}
                        >
                            <CustomRating {...data}/>

                        </Grid>

                        <Grid item xs={8} className={classes.description}>
                            <Box pl={5}>
                                <Box my={1}>
                                    <Typography gutterBottom variant="subtitle1">
                                        {data.title}
                                    </Typography>
                                </Box>

                                {data.description ?
                                    <Box my={1}>
                                        <Typography variant="body2" gutterBottom>
                                            {data.description}
                                        </Typography>
                                    </Box>
                                    : null}
                                <Box my={1}>
                                    <Typography variant="body2" color="textSecondary">
                                        Source: {data.source}
                                    </Typography>
                                </Box>
                                {data.topic ?
                                    <Box my={2}>
                                        <Chip  className={classes.topicChip} variant="outlined" color="primary"
                                              label={data.topic}
                                              icon={<CategoryIcon color={"primary"}/>}/> </Box> : null
                                }
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <ItemAvgRating id={data.id}/>

                            {data.length ?
                                <Typography variant="body2" gutterBottom>
                                    <b>Length: </b> {data.length}
                                </Typography>
                                : null}

                            {data.aspectRatio ?
                                <Typography variant="body2" gutterBottom>
                                    <b>Aspect Ratio: </b> {data.aspectRatio}
                                </Typography>
                                : null}

                        </Grid>

                    </Grid>
                </Paper>
            </Box>
        </Layout>

    )
}

export async function getStaticPaths() {
    // retun a l;st of possible value for id
    const paths = getAllContentIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}: { params: { id: string } }) {
    const postData = getContentData(params.id)
    return {
        props: {
            ...postData
        }
    }
}