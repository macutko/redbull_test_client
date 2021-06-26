import { Copyright } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import HeaderComponent from '../src/HeaderComponent';
import ImageGrid from '../src/ImageGrid';

const useStyles = makeStyles(() => ({
  rootContainer: {
    margin: 0,
    maxWidth: "100%",
  }
}));



export default function Index() {
  const classes = useStyles();
  return (
    <div>
      <HeaderComponent />
      <ImageGrid />

      <Copyright />
    </div>
  );
}
