"use client";

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";
import styles from "../Inicial.module.css";

export default function VinhosInicialPage() {
  const [vinhos, setVinhos] = useState([]);

  useEffect(() => {
    const vinhosLocalStorage = JSON.parse(localStorage.getItem("vinhos")) || [];
    setVinhos(vinhosLocalStorage);
  }, []);

  function apagar(vinho) {
    if (window.confirm(`Deseja mesmo excluir o vinho ${vinho.vrinho}?`)) {
      const novaLista = vinhos.filter((item) => item.id !== vinho.id);
      localStorage.setItem("vinhos", JSON.stringify(novaLista));
      setVinhos(novaLista);
      alert("Vinho excluído com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Vinhos">
      <div className="text-end my-2">
        <Button className={styles.buttonX} href="/vinhos/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={styles.theadX}>Vinho:</th>
              <th className={styles.theadX}>Tipo:</th>
              <th className={styles.theadX}>Safra:</th>
              <th className={styles.theadX}>Teor Alcoólico:</th>
              <th className={styles.theadX}>Fornecedor:</th>
              <th className={styles.theadX}>Preço:</th>
              <th className={styles.theadX}>Estoque:</th>
              <th className={styles.theadX}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vinhos.map((vinho) => {
              return (
                <tr key={vinho.id} className="text-center">
                  <td>{vinho.vinho}</td>
                  <td>{vinho.tipo}</td>
                  <td>{vinho.safra}</td>
                  <td>{vinho.teorAlco}</td>
                  <td>{vinho.fornecedor}</td>
                  <td>{vinho.precoUnico}</td>
                  <td>{vinho.estoque}</td>
                  <td className="text-center">
                    <Button
                      className={styles.buttonXY}
                      href={`/vinhos/form?id=${vinho.id}`}
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
