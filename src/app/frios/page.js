"use client";

import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";

export default function FriosInicialPage() {
  const [frios, setFrios] = useState([]);

  useEffect(() => {
    const friosLocalStorage = JSON.parse(localStorage.getItem("frios")) || [];
    setFrios(friosLocalStorage);
    console.log(friosLocalStorage);
  }, []);

  function apagar(frio) {
    if (window.confirm(`Deseja mesmo excluir o frio ${frio.frio}?`)) {
      const novaLista = frios.filter((item) => item.id !== frio.id);
      localStorage.setItem("frios", JSON.stringify(novaLista));
      setFrios(novaLista);
      alert("Frio excluído com sucesso!!");
    }
  }

  return (
    <Pagina>
      <div className="text-end my-2">
        <Button href="/frios/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Frio:</th>
            <th>Tipo:</th>
            <th>Peso:</th>
            <th>Fornecedor:</th>
            <th>Preço:</th>
            <th>Estoque:</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {frios.map((vinho) => {
            return (
              <tr key={vinho.id} className="text-center">
                <td>{vinho.frio}</td>
                <td>{vinho.tipo}</td>
                <td>{vinho.peso}</td>
                <td>{vinho.fornecedor}</td>
                <td>{vinho.precoUnico}</td>
                <td>{vinho.estoque}</td>
                <td className="text-center">
                  <Button className="me-2" href={`/frios/form?id=${vinho.id}`}>
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(vinho)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
