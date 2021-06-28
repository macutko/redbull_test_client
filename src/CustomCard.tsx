import { Link } from "@material-ui/core";
import {Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import React from "react";
import {IContent, useLoaded} from "../lib/utils";

const useStyles = makeStyles({
    cardContainer: {
        width: "100%",
        height: "100%"
    },
});


const CustomCard = (data: IContent) => {

    const classes = useStyles();
    const loaded = useLoaded();
    return (
        loaded ?
            <Card className={classes.cardContainer}>
                <Link href={`/content/${data.id}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={data.title}
                            height="250"
                            image={data.previewUrl ? data.previewUrl : data.contentUrl}
                            title={data.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {data.title}
                            </Typography>
                            {data.description ?
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {data.description?.length > 130 ? data.description.slice(0, 130) + "..." : data.description}
                                </Typography>
                                : null}
                        </CardContent>
                    </CardActionArea>
                </Link>
                {/*<CardActions>*/}

                {/*<Button size="small" color="primary">*/}
                {/*    More*/}
                {/*</Button>*/}
                {/*</CardActions>*/}
            </Card>
            : null

    )
}
export default CustomCard