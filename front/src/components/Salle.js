import React from 'react';

class Salle extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            horaires: [],
            debug: null,
            apiResponse: ""
        }
    }

    callApi(){
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}))
            .catch(err => err)

        // async await
    }


    componentDidMount() {
        // this.fetchInfoSalle()
        this.callApi()
    }



    fetchInfoSalle(){

            // fetchYear()

    }


    render() {
        return(
            <div>
                <div>SALLE</div>
                <p className="App-intro">here some shit:{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default Salle;