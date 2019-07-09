import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


const useStyles = makeStyles(theme => ({
}));

export default function EleveScanner(props) {
  const classes = useStyles();
  const {...other } = props;
  return (
    <Dialog {...other }>
      <DialogTitle>Accès élève</DialogTitle>
      Scanner...
    </Dialog>
  );
}


