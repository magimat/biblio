import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Quagga from 'quagga'; 




class EleveScanner extends React.Component {
  


  
  render(props) {
    
    const {...other } = props;

    return (
      <Dialog {...other }>
        <DialogTitle>Accès élève</DialogTitle>
        Scanner...
      </Dialog>
    );
  }
  
}



export default EleveScanner;
