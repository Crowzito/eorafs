"use client";

import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Pagina from "../components/Pagina";
import styles from "../Inicial.module.css";

export default function PedidosInicialPage() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosLocalStorage =
      JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(pedidosLocalStorage);
    console.log(pedidosLocalStorage);
  }, []);

  function apagar(pedido) {
    if (window.confirm(`Deseja mesmo excluir o pedido de ${pedido.cliente}?`)) {
      const novaLista = pedidos.filter((item) => item.id !== pedido.id);
      localStorage.setItem("pedidos", JSON.stringify(novaLista));
      setPedidos(novaLista);
      alert("Pedido excluído com sucesso!!");
    }
  }

  return (
    <Pagina>
      <div className="text-end my-2">
        <Button className={styles.buttonX} href="/pedidos/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <div className={styles.tableWrapper}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={styles.theadX}>Cliente:</th>
              <th className={styles.theadX}>Quantidade:</th>
              <th className={styles.theadX}>Data:</th>
              <th className={styles.theadX}>Status:</th>
              <th className={styles.theadX}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              return (
                <tr key={pedido.id} className="text-center">
                  <td>{pedido.cliente}</td>
                  <td>{pedido.quantidade}</td>
                  <td>{pedido.data}</td>
                  <td>{pedido.status}</td>
                  <td className="text-center">
                    <Button
                      className={styles.buttonXY}
                      href={`/pedidos/form?id=${pedido.id}`}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className={styles.buttonXY}
                      variant="danger"
                      onClick={() => apagar(pedido)}
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
