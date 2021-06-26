import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Copyright from '../src/Copyright';
import HeaderComponent from '../src/HeaderComponent';
import ImageGrid from '../src/ImageGrid';

const useStyles = makeStyles(() => ({
  rootContainer: {
    margin: 0,
    width: "100vw"
  }
}));

export default function Index() {
  const classes = useStyles();
  return (
    <div className={classes.rootContainer}>
      <HeaderComponent />
      <ImageGrid />
      <Copyright />
    </div>
  );
}
