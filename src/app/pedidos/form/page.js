"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import Pagina from "@/app/components/Pagina";
import styles from "@/app/Form.module.css";

export default function PedidosFormPage(props) {
  const [pedidoEditado, setPedidoEditado] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [frios, setFrios] = useState([]);
  const [vinhos, setVinhos] = useState([]);
  const router = useRouter();

  const id = props.searchParams?.id;

  useEffect(() => {
    setClientes(JSON.parse(localStorage.getItem("clientes")) || []);
    setFrios(JSON.parse(localStorage.getItem("frios")) || []);
    setVinhos(JSON.parse(localStorage.getItem("vinhos")) || []);
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedido = pedidos.find((item) => item.id === id);
    setPedidoEditado(pedido || null);
  }, [id]);

  function salvar(dados) {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (pedidoEditado) {
      // Atualizando pedido existente
      const index = pedidos.findIndex((p) => p.id === pedidoEditado.id);
      pedidos[index] = { ...dados, id: pedidoEditado.id };
    } else {
      // Adicionando novo pedido
      dados.id = v4();
      pedidos.push(dados);
    }

    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    alert("Pedido salvo com sucesso!");
    router.push("/pedidos");
  }

  const initialValues = pedidoEditado || {
    frio: "",
    vinho: "",
    cliente: "",
    quantidade: "",
    data: "",
    status: "",
    tipo: "",
  };

  const validationSchema = Yup.object().shape({
    cliente: Yup.string().required("Campo Obrigatório"),
    quantidade: Yup.number().required("Campo Obrigatório"),
    data: Yup.date().required("Campo Obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    tipo: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina>
      <div className={styles["form-container"]}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => salvar(values)}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="my-2">
                <Form.Group as={Col}>
                  <Form.Label className={styles["form-label"]}>
                    Cliente:
                  </Form.Label>
                  <Form.Select
                    className={styles["form-input"]}
                    name="cliente"
                    value={values.cliente}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cliente && !errors.cliente}
                    isInvalid={touched.cliente && errors.cliente}
                  >
                    <option value="">Selecione</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.nome}>
                        {cliente.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.cliente}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className={styles["form-label"]}>
                    Quantidade:
                  </Form.Label>
                  <Form.Control
                    className={styles["form-input"]}
                    name="quantidade"
                    type="number"
                    value={values.quantidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.quantidade && !errors.quantidade}
                    isInvalid={touched.quantidade && errors.quantidade}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantidade}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label className={styles["form-label"]}>
                    Tipo:
                  </Form.Label>
                  <Form.Select
                    className={styles["form-input"]}
                    name="tipo"
                    value={values.tipo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipo && !errors.tipo}
                    isInvalid={touched.tipo && errors.tipo}
                  >
                    <option value="">Selecione:</option>
                    <option value="Frios">Frios</option>
                    <option value="Vinhos">Vinhos</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.tipo}
                  </Form.Control.Feedback>
                </Form.Group>

                {values.tipo === "Vinhos" && (
                  <Form.Group as={Col}>
                    <Form.Label className={styles["form-label"]}>
                      Vinho:
                    </Form.Label>
                    <Form.Select
                      className={styles["form-input"]}
                      name="vinho"
                      value={values.vinho}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Selecione</option>
                      {vinhos.map((vinho) => (
                        <option key={vinho.id} value={vinho.vinho}>
                          {vinho.vinho}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}

                {values.tipo === "Frios" && (
                  <Form.Group as={Col}>
                    <Form.Label className={styles["form-label"]} l>
                      Frios:
                    </Form.Label>
                    <Form.Select
                      className={styles["form-input"]}
                      name="frio"
                      value={values.frio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Selecione</option>
                      {frios.map((frio) => (
                        <option key={frio.id} value={frio.frio}>
                          {frio.frio}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label className={styles["form-label"]}>
                    Data do Pedido:
                  </Form.Label>
                  <Form.Control
                    className={styles["form-input"]}
                    type="date"
                    name="data"
                    value={values.data}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.data && !errors.data}
                    isInvalid={touched.data && errors.data}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.data}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className={styles["form-label"]}>
                    Status:
                  </Form.Label>
                  <Form.Select
                    className={styles["form-input"]}
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.status && !errors.status}
                    isInvalid={touched.status && errors.status}
                  >
                    <option value="">Selecione:</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregue">Entregue</option>
                    <option value="Cancelado">Cancelado</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="primary"
                  onClick={() => router.push("/pedidos")}
                >
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Pagina>
  );
}
