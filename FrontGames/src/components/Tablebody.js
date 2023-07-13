import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Tablebody({ Games = [] }) {
  const axiosDelete = (id) => {
    const url = "http://localhost/back/Api/Games.php?id="+id
    try {
      axios.delete(url).then((response) => {
        console.log(response);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tbody>
      {Games.map((item, index) => (
        <tr key={index} className=" text-center">
          <th scope="col">{item.id}</th>
          <th scope="col">
            <img
              className="imgPoster align-middle"
              src={item.img}
            ></img>
          </th>
          <th scope="col" className="align-middle">
            <p> {item.nombre}</p>
          </th>
          <th scope="col" className="align-middle">
            <p>{item.genero}</p>
          </th>
          <th scope="col" className="align-middle">
            <p>{item.plataforma}</p>
          </th>
          <th scope="col" className="align-middle">
            <p>{item.estado}</p>
          </th>
          <th scope="col" className="align-middle">
            <Link to={`/Form/${item.id}`}>
              <button className="btn  btn-primary ">Actualizar </button>
            </Link>
            
              <button className="btn  btn-danger " onClick={()=>axiosDelete(item.id)}>Borrar </button>
            
          </th>
        </tr>
      ))}
    </tbody>
  );
}

export default Tablebody;
