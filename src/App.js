import React, { Component } from "react";
import "./App.css";
import Buscador from "./componentes/Buscador";
import Resultado from "./componentes/Resultado";

class App extends Component {
  state = {
    termino: "",
    images: [],
    pagina: ""
  };

  paginaAnterior = () => {
    let pagina = this.state.pagina;
    if (pagina === 1) return null;
    pagina--;
    this.setState({ pagina }, () => {
      this.consultarApi();
    });
    console.log(pagina);
  };
  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    pagina++;
    this.setState({ pagina }, () => {
      this.consultarApi();
    });
    console.log(pagina);
  };

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=12738732-79770055108af6cdac2890dd9&q=${termino}&per_page=4&page=${pagina}`;
    //console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ images: resultado.hits }));
  };

  datosBusqueda = termino => {
    this.setState(
      {
        termino: termino,
        pagina: 1
      },
      () => {
        this.consultarApi();
      }
    );
  };
  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes.</p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.images}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
