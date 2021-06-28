import {Box, Chip, fade, makeStyles, Typography} from "@material-ui/core";
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
        // width: 500,
        maxHeight: "100%",
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
    topicChip: {
        padding: 5,
        color: theme.palette.error.main
    },
    text: {
        textAlign: "justify"
    },
    info: {
        backgroundColor: fade(theme.palette.primary.main, 0.4),
        borderRadius: 25,

    }
}));

export default function RBContent(data: IContent) {
    const classes = useStyles()

    return (

        <Layout>
            <Box my={3}>
                <Paper className={classes.paper} elevation={3}>
                    <Box px={"1vw"} pb={5}>
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

                            <Grid item md={8} className={classes.description}>
                                <Box px={2} py={3} style={{borderRadius: "25px", border: "1px solid"}}>
                                    <Box my={1}>
                                        <Typography gutterBottom variant="subtitle1" className={classes.text}>
                                            {data.title}
                                        </Typography>
                                    </Box>

                                    {data.description ?
                                        <Box my={1}>
                                            <Typography variant="body2" gutterBottom className={classes.text}>
                                                {data.description}
                                            </Typography>
                                        </Box>
                                        : null}
                                    <Box my={1}>
                                        <Typography variant="body2" color="textSecondary" className={classes.text}>
                                            Source: {data.source}
                                        </Typography>
                                    </Box>
                                    {data.topic ?
                                        <Box my={2}>
                                            <Chip className={`${classes.topicChip} ${classes.text}`} variant="outlined"
                                                  color="primary"
                                                  label={data.topic}
                                                  icon={<CategoryIcon color={"primary"}/>}/> </Box> : null
                                    }
                                </Box>
                            </Grid>

                            <Grid item md={4} style={{width: "100%"}}>
                                <Box px={2} py={3} className={classes.info}>
                                    <ItemAvgRating id={data.id}/>

                                    {data.length ?
                                        <Typography variant="body2" gutterBottom className={classes.text}>
                                            <b>Length: </b> {data.length}
                                        </Typography>
                                        : null}

                                    {data.aspectRatio ?
                                        <Typography variant="body2" gutterBottom className={classes.text}>
                                            <b>Aspect Ratio: </b> {data.aspectRatio}
                                        </Typography>
                                        : null}
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>

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