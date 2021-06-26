import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    lander: {
        height: "90vh",
        backgroundColor: theme.palette.primary.main,
        width: "100vw",
        margin: 0,
        maxWidth: "100%",
    }
}));

const HeaderComponent = () => {
    const classes = useStyles();
    return (
        <Box className={classes.lander}>
            <h1>RedBull test </h1>
        </Box>
    )
}

export default HeaderComponent;