"use client";

import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";
import styles from "../Inicial.module.css";

export default function FornecedoresInicialPage() {
  const [fornecedores, setfornecedores] = useState([]);

  useEffect(() => {
    const fornecedoresLocalStorage =
      JSON.parse(localStorage.getItem("fornecedores")) || [];
    setfornecedores(fornecedoresLocalStorage);
    console.log(fornecedoresLocalStorage);
  }, []);

  function apagar(fornecedor) {
    if (
      window.confirm(`Deseja mesmo excluir o fornecedor ${fornecedor.nome}?`)
    ) {
      const novaLista = fornecedores.filter(
        (item) => item.id !== fornecedor.id
      );
      localStorage.setItem("fornecedores", JSON.stringify(novaLista));
      setfornecedores(novaLista);
      alert("Fornecedor excluído com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Fornecedores">
      <div className="text-end my-2">
        <Button className={styles.buttonX} href="/fornecedores/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={styles.theadX}>Nome:</th>
              <th className={styles.theadX}>CNPJ:</th>
              <th className={styles.theadX}>E-mail:</th>
              <th className={styles.theadX}>Telefone:</th>
              <th className={styles.theadX}>País:</th>
              <th className={styles.theadX}>Estado:</th>
              <th className={styles.theadX}>Produtos</th>
              <th className={styles.theadX}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => {
              return (
                <tr key={fornecedor.id} className="text-center">
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.cnpj}</td>
                  <td>{fornecedor.email}</td>
                  <td>{fornecedor.telefone}</td>
                  <td>{fornecedor.pais}</td>
                  <td>{fornecedor.estado}</td>
                  <td>
                    {/* Verifica se fornecedor.produto é um array e exibe seus itens separados por vírgula */}
                    {Array.isArray(fornecedor.produtos)
                      ? fornecedor.produtos.join(", ")
                      : fornecedor.produtos}
                  </td>
                  <td className="text-center">
                    <Button
                      className={styles.buttonXY}
                      href={`/fornecedores/form?id=${fornecedor.id}`}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className={styles.buttonXY}
                      variant="danger"
                      onClick={() => apagar(fornecedor)}
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
