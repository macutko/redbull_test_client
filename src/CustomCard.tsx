import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { IContent } from "./utils";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});


const CustomCard = (data: IContent) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={data.title}
                    height="140"
                    image={data.previewUrl ? data.previewUrl : data.contentUrl}
                    title={data.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}
export default CustomCard