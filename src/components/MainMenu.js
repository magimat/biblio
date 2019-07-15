import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./MainMenu.module.css";
import Quagga from 'quagga'; 
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import BiblioHeader from './BiblioHeader';
import { Shake } from 'reshake'


class EleveScanner extends Component {
    state = { show: false,
              shakeFixed: false,
              showShake: false
            }      

            
    showModal = () => {
      this.setState({ show: true });
    };
  
    hideModal = () => {
      this.setState({ show: false });
    };


    stopShake = () => {
      this.setState({ shakeFixed: false });
    };

    startShake = () => {
      this.setState({ shakeFixed: true, showShake: true });
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

      //Quagga.stop();
      



      //document.getElementById('annuler').click();
      
      
      
      //alert(result.codeResult.code);
      //fetch('https://swapi.co/api/people/1')
      //      .then(res => res.json())
      //      .then((data) => {
      //          console.log(data)
      //      })
      //      .catch(console.log)
      //alert(result.codeResult.code);
      //Quagga.start();


      document.getElementById('invisibleBtnStart').click();
      setTimeout(function(){ document.getElementById('invisibleBtnStop').click() }, 1000);
      
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

            <Modal showShake={this.state.showShake} handleShakeStart={this.startShake}  handleShakeStop={this.stopShake}  show={this.state.show} handleClose={this.hideModal} fixed={this.state.shakeFixed} />
          </Grid>

        </div>

      );
    }
  }





const Modal = ({ showShake, handleShakeStart, handleShakeStop, handleClose, show, fixed}) => {
    const showHideClassname = show ? (styles.modal + " " + styles.displayBlock)  : (styles.modal + " " + styles.displayNone);
  
    const shakeClass = showShake ? (styles.shake) : (styles.invisible);
  


    return (
      <div id='myModal' className={showHideClassname}>
        <section className={styles.modalmain}>
        Scan ta carte d'élève...
          <div id="elevescanner" className="viewport"/>
          <div id="bottomModal">
            <button id='annuler' onClick={handleClose}>ANNULER</button>  
            <Shake className={shakeClass} h={45} v={0} r={0} dur={200} int={30} max={100} fixed={fixed}>Code invalide</Shake>
          </div>
          <button id='invisibleBtnStart' className={styles.invisible} onClick={handleShakeStart}>invisible</button>
          <button id='invisibleBtnStop' className={styles.invisible} onClick={handleShakeStop}>invisible</button>
          
        </section>



      </div>
    );
  };



export default EleveScanner;