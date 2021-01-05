import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './Components/Formulario';
import Cancion from './Components/Cancion';
import Error from './Components/Error';
import Info from './Components/Info';
import Spinner from "./Components/Spinner";
import axios from "axios";


function App() {

  //Definir el State

  const [ busquedaletra, guardarBusquedaLetra ] = useState({});
  const [ letra, guadarletra ] = useState("");
  const [ info, guardarInfo ] = useState({});
  const [ cargando, guardarCargando ] = useState(false);
  const [ error, guardarError ] = useState(false);


  useEffect(() => {
    
    const consultarApiLetra = async () =>{
      if(Object.keys(busquedaletra).length === 0 ) return;

      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      try{
        const [ { data: { lyrics } }, { data: { artists } } ] = await Promise.all([axios.get(url),axios.get(url2)]);

        guardarError(false);
        guardarCargando(false);
  
        guadarletra(lyrics);
        guardarInfo(artists[0]);
        

      }catch(error){
        guardarError(true);
        guardarCargando(false);
      }

    };
    consultarApiLetra();

  }, [busquedaletra]);



  return (
      <Fragment>
        <Formulario
          guardarCargando={guardarCargando}
          guardarBusquedaLetra={guardarBusquedaLetra}
        />
        <div className="container mt-5">
          <div className="row justify-content-center">
            {
              cargando ? null
              :
              error ? 
              <Error mensaje="Artista o canción no encontrados" />
              :
              null
            }
          </div>
        </div>
        
        <div className="container">
            {cargando ? <Spinner />           
              :
              !error ?
                <div className="row">
                  <div className="col-md-6">
                      <Info info={info}/> 

                    </div>
                    <div className="col-md-6">
                      <Cancion
                          letra={letra}
                      />
                  </div>
              </div> 
            : null
            }
      </div>


      </Fragment>
  );
}

export default App;

 