import React from 'react';
import Infos from "./Infos";
import '../bootstrap.css'


// const ical = require("ical.js");
import ical from "ical.js"
import Composantes from "./Composantes";

class Salle extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            horaires: [],
            debug: null,
            apiResponse: null,
            error: null,
            isLoaded: false,
            selectedSalle: "---",
            infos: null,
            allMod:false

        }
    }

    // selectedSalle = React.createRef()

    callApi(){
        fetch("http://localhost:9000/API")
            .then(res => res.json())
            .then(res => {this.setState({
                apiResponse: res,
                isLoaded: true
            })},
                (error)=>{
                    this.setState({
                        isLoaded : true,
                        error
                    })
                }
            )
        // async await
    }


    componentDidMount() {
        // this.fetchInfoSalle()
        this.callApi()
    }



    fetchInfoSalle(){

            // fetchYear()

    }
    handleSubmit = (event) => {
        // event.preventDefault()

        // console.debug(this.selectedSalle)
        // console.debug(this.state.selectedSalle)



        // this.setState({infos : <Infos data={this.state.apiResponse.salles} salle={this.state.selectedSalle}/>})
    }

    handleChangeSalle = (event) => {
        let val = event.currentTarget.value
        this.setState({ selectedSalle : val })
        console.debug("update selsalle")
    }

    displayBtn = () => {
        // if(this.state.selectedSalle !== "---")
        if(false)
        return <p><button className="btn btn-primary" id="btn" onClick={this.handleSubmit}>go</button></p>
    }

    displayInfos = () => {
        if(this.state.selectedSalle !== "---"|| this.state.allMod){

            let horairesOccupations = []
            let AllData = []

            if(this.state.allMod){
                AllData = Object.entries(this.state.apiResponse.salles).map((sl,i) => {

                    horairesOccupations = this.state.apiResponse.salles[sl[0]].map((el)=>{
                        let out = {};

                        let start = ical.Time.fromDateTimeString(el.start)
                        let end = ical.Time.fromDateTimeString(el.end)

                        out = {
                            start : {
                                hour : start.hour,
                                min : start.minute
                            },
                            end : {
                                hour : end.hour,
                                min : end.minute
                            }
                        }
                        return out;
                    })
                    return {nom: sl[0], value : horairesOccupations} // []
                })
            }else{

                    let x = this.state.apiResponse.salles[this.state.selectedSalle]

                    horairesOccupations = x.map((el)=>{
                        let out = {};

                        let start = ical.Time.fromDateTimeString(el.start)
                        let end = ical.Time.fromDateTimeString(el.end)

                        out = {
                            start : {
                                hour : start.hour,
                                min : start.minute
                            },
                            end : {
                                hour : end.hour,
                                min : end.minute
                            }
                        }
                        return out
                        // ICAL.Time.fromDateTimeString(el.start)
                    }
                )

            }



            return <Infos data={horairesOccupations} allMod={this.state.allMod} salle={this.state.selectedSalle} allData={AllData} />
        }
    }

    selectALL = (event) => {
        if(event.target.checked){
            this.setState({allMod : true,
                                selectedSalle : "---"})
        }else{
            this.setState({allMod : false})
        }

    };


    render() {
        const { error, isLoaded, apiResponse} = this.state;

        if(error){
            return <div>Erreur : {error.message}</div>
        }

        if(!isLoaded){
            return <div>Chargement...</div>
        }else{
            // console.debug(apiResponse)
            return(



                <div className="Salle">


                    <div  className="card-header">Outil pour trouver une salle</div>
                    <div className="card-body">
                        <h3 className="card-title">choisissez les filières:</h3>

                        <div className="card-text">

                                <Composantes data={apiResponse.composantes} />

                        </div>

                        <h3 className="card-title">choisissez une salle : </h3>
                        <div className="card-text">
                            <select className="custom-select" id="salle" disabled={this.state.allMod}  value={this.state.selectedSalle} onChange={this.handleChangeSalle}>
                                <option>---</option>
                                {Object.keys(apiResponse.salles).map( (s,index) => (
                                        <option key={index} value={s}> {s}  </option>
                                    )
                                )}
                            </select>
                            <div className="custom-control custom-switch">
                                <input type="checkbox" onChange={this.selectALL} className="custom-control-input" id="allMod"/>
                                <label className="custom-control-label" htmlFor="allMod"> sélectionner toutes les salles </label>
                            </div>


                        </div>
                    </div>

                    {/*<form onSubmit={this.handleSubmit}>*/}
                    {/*<div>SALLE</div>*/}

                    {/*<p className="page-header"><h2>choisissez une salle : </h2></p>*/}

                    {this.displayBtn()}
                    {/*</form>*/}
                    {this.displayInfos()}
                </div>
            );
        }


    }
}

export default Salle;