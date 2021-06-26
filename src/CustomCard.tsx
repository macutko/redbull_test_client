import { Box, Button, Card, CardActions, CardContent, CardMedia, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { IContent, useLoaded } from "../lib/utils";

const useStyles = makeStyles({
    cardContainer: {
        width: "100%"
    },
});


const CustomCard = (data: IContent) => {

    const classes = useStyles();
    const loaded = useLoaded();
    return (
        loaded ?
            <Box mt={1}>
                <Card className={classes.cardContainer} >

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
                        <Typography variant="body2" color="textSecondary" component="p">
                            {data.description && data.description?.length > 130 ? data.description.slice(0, 130) + "..." : data.description}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Link href={`/content/${data.id}`}>
                            <Button size="small" color="primary">
                                More
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Box>
            : null

    )
}
export default CustomCard