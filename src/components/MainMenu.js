import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BiblioHeader from './BiblioHeader';
import EleveScanner from './EleveScanner';


const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 60
  },
  mainContainer: {
  }
}));




export default function MainMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };


  return (
      <div>
      <Grid     
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.mainContainer}>
        
        <Grid item>
          <BiblioHeader></BiblioHeader>
        </Grid>

        <Grid item>
          <Button size="large" onClick={handleClickOpen} fullWidth variant="contained" color="primary" className={classes.margin}>
            Accès Élève
          </Button>
        </Grid>
        <Grid item>
          <Button size="large" href="/prof" fullWidth variant="contained" color="primary" className={classes.margin}>
            Accès Prof
          </Button>
        </Grid>
    
      </Grid>
      <EleveScanner open={open} onClose={handleClose} />

      </div>
  );
}