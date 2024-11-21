"use client";

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";
import styles from "../Inicial.module.css";

export default function ClientesInicialPage() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const clientesLocalStorage =
      JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(clientesLocalStorage);
  }, []);

  function apagar(cliente) {
    if (window.confirm(`Deseja mesmo excluir o cliente ${cliente.nome}?`)) {
      const novaLista = clientes.filter((item) => item.id !== cliente.id);
      localStorage.setItem("clientes", JSON.stringify(novaLista));
      setClientes(novaLista);
      alert("Cliente excluído com sucesso!!");
    }
  }

  return (
    <Pagina>
      <div className="text-end my-3">
        <Button className={styles.buttonX} href="/clientes/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={styles.theadX}>Nome:</th>
              <th className={styles.theadX}>E-mail:</th>
              <th className={styles.theadX}>Telefone:</th>
              <th className={styles.theadX}>CPF:</th>
              <th className={styles.theadX}>País:</th>
              <th className={styles.theadX}>Estado:</th>
              <th className={styles.theadX}>Data de Nascimento:</th>
              <th className={styles.theadX}>Ações:</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((doador) => {
              return (
                <tr key={doador.id} className="text-center">
                  <td>{doador.nome}</td>
                  <td>{doador.email}</td>
                  <td>{doador.telefone}</td>
                  <td>{doador.cpf}</td>
                  <td>{doador.pais}</td>
                  <td>{doador.estado}</td>
                  <td>{doador.dataNascimento}</td>
                  <td>
                    <Button
                      className={styles.buttonXY}
                      href={`/clientes/form?id=${doador.id}`}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className={styles.buttonXY}
                      variant="danger"
                      onClick={() => apagar(doador)}
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
