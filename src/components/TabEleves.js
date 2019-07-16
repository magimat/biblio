import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";


class TabEleves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = 'https://7k0efmnyk9.execute-api.us-east-1.amazonaws.com/latest/eleves';

    fetch(apiUrl)
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
                { title: "ID", field: "eleveid" },
                { title: "Prénom", field: "prenom" },
                { title: "Nom", field: "nom"},
                { title: "Groupe", field: "groupe"},
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

                                fetch('https://7k0efmnyk9.execute-api.us-east-1.amazonaws.com/latest/eleves', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({
                                    eleveid: newData.eleveid,
                                    prenom: newData.prenom,
                                    nom: newData.nom,
                                    groupe: newData.groupe
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

                                fetch('https://7k0efmnyk9.execute-api.us-east-1.amazonaws.com/latest/eleves/' + oldData.eleveid, {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({
                                    eleveid: newData.eleveid,
                                    prenom: newData.prenom,
                                    nom: newData.nom,
                                    groupe: newData.groupe
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
                                
                                fetch('https://7k0efmnyk9.execute-api.us-east-1.amazonaws.com/latest/eleves/' + oldData.eleveid, {
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

export default TabEleves;