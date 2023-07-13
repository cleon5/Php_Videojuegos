import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Tablebody from "../components/Tablebody";
import { Link } from "react-router-dom";

function Home() {
  const [Game, setGame] = useState([]);

  const url = "http://localhost/back/Api/Games.php";
  const axiosGet = (url) => {
    axios.get(url).then((data) => {
      console.log(data.data);
      setGame(data.data);
    });
  };
  useEffect(() => {
    axiosGet(url);
  }, []);



  return (
    <div>
      <h1 className="m-4 text-center">Lista de Videojuegos</h1>

      <Link to={"/Form"}>
        <button className="btn btn-flotante">Crear</button>
      </Link>
      <div className=" container">
        <table className="table table-hover">
          <thead className="table-dark  text-center">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Imagen</th>
              <th scope="col">Nombre</th>
              <th scope="col">Genero</th>
              <th scope="col">Plataforma</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <Tablebody Games={Game?.data} />
        </table>
      </div>
    </div>
  );
}

export default Home;
