import React, {useState} from 'react';
import PropTypes from "prop-types";


const Formulario = ({guardarBusquedaLetra , guardarCargando}) => {

    const [ busqueda, guardarBusqueda ] = useState({
        artista: "",
        cancion: ""
    });

    const [ error, guardarError ] = useState(false);

    const { artista, cancion } = busqueda;

    // Funcion que actualiza el state

    const actualizarState = e =>{

        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    };

    const buscarInformacion = e =>{
        e.preventDefault();
        guardarCargando(true);

        if(artista.trim() === "" || cancion === ""){
            guardarError(true);
            guardarCargando(false);
            return;
        }

        guardarError(false);

        guardarBusquedaLetra(busqueda);
    }

    return ( 

        <div className="bg-info">
            {error ? <p className="alert alert-danger text-center p-2">Todos los campos son obligatorios</p> : null }
            <div className="container">
                <div className="row">
                    <form
                        onSubmit={buscarInformacion}
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                    >
                        <fieldset>
                            <legend className="text-center">Buscador Letras Canciones</legend>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Artista</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="artista"
                                                placeholder="Nombre Artista"
                                                onChange={actualizarState}
                                                value={artista}
                                            />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Canción</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="cancion"
                                                placeholder="Nombre Cancion"
                                                onChange={actualizarState}
                                                value={cancion}
                                            />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary float-right"
                                >
                                    Buscar
                                </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
Formulario.propTypes = {
    guardarBusquedaLetra: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired,
}
export default Formulario;

