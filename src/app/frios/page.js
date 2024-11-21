"use client";

import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";
import styles from "../Inicial.module.css";

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
        <Button className={styles.buttonX} href="/frios/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={styles.theadX}>Frio:</th>
              <th className={styles.theadX}>Tipo:</th>
              <th className={styles.theadX}>Peso:</th>
              <th className={styles.theadX}>Fornecedor:</th>
              <th className={styles.theadX}>Preço:</th>
              <th className={styles.theadX}>Estoque:</th>
              <th className={styles.theadX}>Ações</th>
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
                    <Button
                      className={styles.buttonXY}
                      href={`/frios/form?id=${vinho.id}`}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className={styles.buttonXY}
                      variant="danger"
                      onClick={() => apagar(vinho)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Pagina>
  );
}
