import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./MainMenu.module.css";
import Quagga from 'quagga'; 
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import BiblioHeader from './BiblioHeader';

class EleveScanner extends Component {
    state = { show: false };
    scannerStarted = true;

    showModal = () => {
      this.setState({ show: true });
    };
  
    hideModal = () => {
      this.setState({ show: false });
    };
  
    componentDidMount() {
        Quagga.init({
            inputStream : {
              name : "Live",
              type : "LiveStream",
              target: document.getElementById('elevescanner'),
              
              constraints: {
                width: 640,
                height: 480
              }

          },
          decoder : {
            readers : ["code_128_reader"]
          },
          locate: true
        }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          console.log("Initialization finished. Ready to start");
          
          document.querySelector("canvas").style.display='none'
          Quagga.start();
          //alert()
          
      });
        Quagga.onDetected(this._onDetected);
    };

    _onDetected(result) {

      Quagga.stop();
      
      document.getElementById('annuler').click();
      //alert(result.codeResult.code);
      fetch('https://swapi.co/api/people/1')
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            })
            .catch(console.log)
      //alert(result.codeResult.code);
      //Quagga.start();
    };


    render() {
      return (
        <div>
          <Grid     
            container
            direction="column"
            alignItems="center"
            justify="center"
            className={styles.mainContainer}>
          
            <Grid item>
              <BiblioHeader></BiblioHeader>
            </Grid>
  
            <Grid item className={styles.margin}> 
              <Button size="large" onClick={this.showModal} variant="contained" color="primary" >
                Accès Élève
              </Button>
            </Grid>
            <br/>
            <Grid item>
              <Button size="large" href="/prof" variant="contained" color="primary" className={styles.margin}>
                Accès Prof
              </Button>
            </Grid>

            <Modal show={this.state.show} handleClose={this.hideModal} />
          </Grid>
  
        </div>

      );
    }
  }





const Modal = ({ handleClose, show }) => {
    const showHideClassname = show ? (styles.modal + " " + styles.displayBlock)  : (styles.modal + " " + styles.displayNone);
  
    return (
      <div id='myModal' className={showHideClassname}>
=        <section className={styles.modalmain}>
        Scan ta carte d'élève...
          <div id="elevescanner" className="viewport"/>
          <button id='annuler' onClick={handleClose}>ANNULER</button>
        </section>
      </div>
    );
  };



export default EleveScanner;