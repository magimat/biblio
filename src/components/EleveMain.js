import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BiblioHeader from './BiblioHeader';
import * as Constants from '../constants.js'


function findGetParameter(parameterName) {
  var result = null,
  tmp = [];
  window.location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
}



class EleveMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      response: {}
    }
  }

  componentDidMount() {
    fetch(Constants.ELEVES_API_URL + '/' + findGetParameter('eleveid'))
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            data: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }


  render() {
   
    return (
    
      <Grid     
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column">
        
        <Grid item>
          <BiblioHeader></BiblioHeader>
        </Grid>

        <Grid item>
          <h1>{this.state.data.prenom} {this.state.data.nom}</h1>
        </Grid>
      </Grid>
    
    );
  }
}

export default EleveMain;