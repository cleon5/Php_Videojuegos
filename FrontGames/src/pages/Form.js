import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Form() {
  let { id } = useParams();
  const [Nombre, setNombre] = useState("");
  const [img, setimg] = useState("");
  const [Genero, setGenero] = useState("");
  const [Plataforma, setPlataforma] = useState("");
  const [Estado, setEstado] = useState("");

  const url = "http://localhost/back/Api/Games.php";

  const changeNombre = (event) => {
    setNombre(event.target.value);
  };
  const changeGenero = (event) => {
    setGenero(event.target.value);
  };
  const changeimg = (event) => {
    setimg(event.target.value);
  };
  const changePlataforma = (event) => {
    setPlataforma(event.target.value);
  };
  const changeEstado = (event) => {
    setEstado(event.target.value);
  };
  //Get de una Game
  const axiosGet = (url) => {
    axios.get(url + "?id=" + id).then((data = data.data.data) => {
      setNombre(data.data.data.nombre);
      setGenero(data.data.data.genero);
      setimg(data.data.data.img);
      setPlataforma(data.data.data.plataforma);
      setEstado(data.data.data.estado);
    });
  };
  useEffect(() => {
    axiosGet(url);
  }, []);

  //Put de Game
  const axiosPut = () => {
    const url = "http://localhost/back/Api/Games.php";
    const customConfig = {
      headers: {
        "Content-img": "application/json",
      },
    };
    const json = {
      id: id,
      nombre: Nombre,
      genero: Genero,
      img: img,
      estado: Estado,
      plataforma: Plataforma,
    };
    console.log(json);
    try {
      axios.put(url, json, customConfig).then((response) => {
        console.log(response);
        //regresar();
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Post de Game
  const axiosPost = () => {
    const url = "http://localhost/back/Api/Games.php";
    const customConfig = {
      headers: {
        "Content-img": "application/json",
      },
    };
    const json = {
      nombre: Nombre,
      genero: Genero,
      img: img,
      estado: Estado,
      plataforma: Plataforma,
    };

    try {
      axios.post(url, json, customConfig).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const axiosSave = (id) => {
    id == undefined ? axiosPost() : axiosPut(id);
  };

  return (
    <div className="p-5 container-md">
      <div>
        <h1 className="m-3 text-center">Form de Videjuegos</h1>
      </div>

      <form>
        <div className="mb-3 ">
          <label className="form-label">Titulo del Videojuego</label>
          <input
            onChange={changeNombre}
            value={Nombre}
            img="text"
            className="form-control"
            placeholder="Titulo"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Url de imagen</label>
          <input
            onChange={changeimg}
            value={img}
            img="text"
            className="form-control"
            placeholder="Tipo"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Genero</label>

          <select className="form-select" onChange={changeGenero}>
          <option selected>Selecciona una genero</option>
            <option value="Accion">Accion</option>
            <option value="Aventura">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="Mundo abierto">Mundo abierto</option>
            <option value="Shooter">Shooter</option>
            <option value="Terror">Terror</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Plataforma</label>
          <select className="form-select"  onChange={changePlataforma}>
            <option selected>Selecciona una plataforma</option>
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="Play Station">Play Station</option>
            <option value="Android">Android</option>
            <option value="Nintendo">Nintendo</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <div onChange={changeEstado}>
            <div className="form-check form-check-inline">
              <input className="form-check-input"type="radio"value="Por Jugar" name="estado"></input> 
              <label className="form-check-label">
                Por Jugar
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio"  value="Terminado" name="estado"></input>
              <label className="form-check-label" >
                Terminado
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input  className="form-check-input" type="radio" value="Jugando" name="estado"></input>
              <label className="form-check-label">
                Jugando
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3 justify-content-center">
          <Link to={"/"}>
            <button
              img="button"
              className="btn btn-primary btn-lg"
              onClick={axiosSave}
            >
              Guardar
            </button>
          </Link>

          <Link to={"/"}>
            <button img="button" className="btn btn-secondary btn-lg">
              Descartar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Form;
