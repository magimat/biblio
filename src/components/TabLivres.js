import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import * as Constants from '../constants.js'

class TabLivres extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: [],
      response: {}
    }
  }

  componentDidMount() {
    fetch(Constants.LIVRES_API_URL)
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
    const { error, data} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(

        <div>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              columns={[
                { title: "ID", field: "livreid" },
                { title: "Titre", field: "titre" },
                { title: "Dernier emprunteur", field: "lastEmprunteur" },
                { title: "Date dernier prêt", field: "lastPretDate" },
                { title: "État", field: "state" }
              ]}
              data={data}
              title=""

              editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                
                                const data = this.state.data;
                                data.push(newData);
                                this.setState({ data }, () => resolve()); 

                                fetch(Constants.LIVRES_API_URL, {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({
                                    livreid: newData.livreid,
                                    titre: newData.titre,
                                  })
                                })
                            }
                            resolve();
                        }, 1000);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                const data = this.state.data;
                                const index = data.indexOf(oldData);
                                data[index] = newData;                
                                this.setState({ data }, () => resolve());

                                fetch(Constants.LIVRES_API_URL + '/' + oldData.livreid, {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({
                                    livreid: newData.livreid,
                                    titre: newData.titre,
                                  })
                                })
                            }
                            resolve();
                        }, 1000);
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                let data = this.state.data;
                                const index = data.indexOf(oldData);
                                data.splice(index, 1);
                                this.setState({ data }, () => resolve()); 
                                
                                fetch(Constants.LIVRES_API_URL + '/' + oldData.livreid, {
                                  method: 'DELETE',
                                })

                            }
                            resolve();
                        }, 1000);
                    })
            }}

            />
          </div>
        </div>

      )
    }
  }
}

export default TabLivres;