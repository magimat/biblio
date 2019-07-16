import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BiblioHeader from './BiblioHeader';
import TabEleves from './TabEleves';
import TabLivres from './TabLivres';
import TabEmprunts from './TabEmprunts';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function EleveMain() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    
      <Grid     
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column"
        className={classes.mainContainer}>
        
        <Grid item>
          <BiblioHeader/>
        </Grid>

        <Grid item>
          <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Emprunts" />
            <Tab label="Livres" />
            <Tab label="Élèves" />
          </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><TabEmprunts/></TabContainer>}
          {value === 1 && <TabContainer><TabLivres/></TabContainer>}
          {value === 2 && <TabContainer><TabEleves/></TabContainer>}
        </Grid>
      </Grid>
    
  );
}


