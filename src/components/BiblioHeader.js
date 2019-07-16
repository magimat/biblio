import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({

  title: {
    fontSize: 60
  }

}));

export default function BiblioHeader() {
  const classes = useStyles();

  return (
    
          <Grid container>
            <Grid item>
              <a href="/"><img width="75" src="img/books.png"/></a>
            </Grid>
            <Grid item className={classes.title}> 
               Biblio
            </Grid>    
          </Grid>
    
  );
}