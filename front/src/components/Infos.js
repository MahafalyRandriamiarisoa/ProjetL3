import React from 'react';

class Infos extends React.Component {

    // constructor(props) {
    //     super(props);
    //
    // }

    render() {

        const horaires = this.props.data
        const Allhoraires = this.props.allData
        console.debug("horaires")
        console.debug(horaires)


        if (this.props.allMod) {

            console.debug(Allhoraires)

            return (

                <div>
                    <ul className="list-group">
                        {Allhoraires.map((sl, index) => {
                                if (sl.value.length === 0) {
                                    // console.debug(sl)

                                    return (<ul className="list-group" key={sl.nom+":::::"+index}>
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={sl.nom+index}>
                                                <div className="alert alert-dismissible alert-success" key={sl.nom+":"+index}>
                                                    <h4 key={sl.nom+":::"+index}>
                                                        la salle à l air disponible (allmod)
                                                    </h4>
                                                </div>
                                                <span className="badge badge-primary" key={sl.nom+"::"+index} >{sl.nom}</span>
                                            </li>
                                        </ul>
                                    )
                                } else {

                                    return (
                                        <li className="list-group-item d-flex justify-content-between align-items-center "
                                            key={sl.nom+index}>

                                            {sl.value.map((el, ind) => (<div key={ind} className="alert alert-dismissible alert-warning ">
                                                <h4>occupée
                                                    de {el.start.hour}h{el.start.minute} à {el.end.hour}h{el.end.minute}</h4>
                                            </div>))}

                                            <span className="badge badge-primary">{sl.nom}</span>

                                        </li>)
                                }
                            }
                        )
                        }
                    </ul>
                </div>
            )

        } else {
            if (horaires.length === 0) {
                return (<ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="alert alert-dismissible alert-success">
                            <h4>
                                la salle à l'air disponible</h4></div>
                        <span className="badge badge-primary">{this.props.salle}</span>
                    </li>


                </ul>)
            } else {

                return (
                    <>
                        {/*<p>{salles.toString()}</p>*/}
                        {/*<p>{this.props.salle}</p>*/}
                        <ul className="list-group">
                            {horaires.map(
                                (el, index) =>
                                    (

                                        <li className="list-group-item d-flex justify-content-between align-items-center "
                                            key={index}>
                                            <div className="alert alert-dismissible alert-warning ">
                                                <h4>occupée
                                                    de {el.start.hour}h{el.start.minute} à {el.end.hour}h{el.end.minute}</h4>
                                            </div>
                                            <span className="badge badge-primary">{this.props.salle}</span>

                                        </li>
                                    )
                            )}
                        </ul>
                    </>
                )
            }

        }
    }
}

export default Infos;