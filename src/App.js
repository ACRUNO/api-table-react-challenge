import axios from "axios";
import React, { useEffect, useState } from "react";
import './App.css';

export default function App() {

  //creo un estado donde voy a guardar la respuesta del llamado de la api, para poder acceder a la variable por fuera del useEffect
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function getApiData() {
      try {
        // obtener con fetch la data del llamado a la api 
        await fetch("https://jsonplaceholder.typicode.com/users")
          .then(res => res.json())
          .then(data => setResponse(data));

        // obtener con axios la data del llamado a la api
        // const json = await axios.get("https://jsonplaceholder.typicode.com/users")
        // setResponse(json.data)
      } catch (error) {
        alert(error);
      }
    }
    getApiData();
  }, [])

  return (
    <div className="container">
      <h1 className="header">Users table</h1>
      {/* consulto si en la variable response tengo dato, en caso de que no tenga muestro un loader */}
      {response.length ?
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {/* mapear la data y mostrar la informacion solicitada */}
            {
              response?.map(data => {
                return (
                  <tr>
                    <td className="items">{data.name}</td>
                    <td className="items">{data.username}</td>
                    <td className="items">{data.email}</td>
                    <td className="items">{data.address.street} - {data.address.city}</td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
        :
        //aca se muestra el loader en caso de no tener data en el response
        <div className="loader"></div>
      }
    </div>
  );
}
