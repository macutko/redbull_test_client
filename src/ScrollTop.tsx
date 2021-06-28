import {makeStyles, Theme, useScrollTrigger, Zoom} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";
import React from "react";

;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

export default function ScrollTop({...props}) {
    const classes = useStyles();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });



    const handleClick = () => {
        window.scrollTo(0,0);
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {props.children}
            </div>
        </Zoom>
    );
}