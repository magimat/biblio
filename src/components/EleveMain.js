import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BiblioHeader from './BiblioHeader';


const useStyles = makeStyles(theme => ({

}));

export default function EleveMain() {
  const classes = useStyles();

  return (
    
      <Grid     
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column"
        className={classes.mainContainer}>
        
        <Grid item>
          <BiblioHeader></BiblioHeader>
        </Grid>

        <Grid item>
          EleveMain
        </Grid>
      </Grid>
    
  );
}