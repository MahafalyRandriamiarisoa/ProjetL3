import React from 'react';

class Composantes extends React.Component {

    handleCheckBOX = (event) => {
        if(event.target.checked){
            this.setState({size : 25})
        }else{
            this.setState({size : 5})
        }

    };

    constructor(props) {
        super(props);
        this.state = {
            size : 5
        }

    }

    render() {

        return (

            <div className="Composantes" >
                <div className="custom-control custom-switch">
                    <input type="checkbox" onChange={this.handleCheckBOX} className="custom-control-input" id="hi"/>
                    <label className="custom-control-label" htmlFor="hi"> develloper/réduire </label>
                </div>
                <select className="custom-select" size={this.state.size} style={{width: 280+'px'}} multiple="multiple" tabIndex="30">

                {
                    this.props.data.map((cmp,i)=>(

                        <option key={i} className="custom-control-label" value={cmp.key}> {cmp.value} </option>

                    ))
                }
                </select>

                <button className="btn btn-primary"> next </button>

            </div>
        )
    }


}

export default Composantes;