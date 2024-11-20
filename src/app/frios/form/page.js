"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import Pagina from "@/app/components/Pagina";

export default function FriosFormPage(props) {
  const [fornecedorFiltrado, setFornecedorFiltrado] = useState([]);

  const router = useRouter();

  const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
  const frios = JSON.parse(localStorage.getItem("frios")) || [];
  const id = props.searchParams.id;
  const frioEditado = frios.find((item) => item.id == id);

  function salvar(dados) {
    if (frioEditado) {
      Object.assign(frioEditado, dados);
      localStorage.setItem("frios", JSON.stringify(frios));
    } else {
      dados.id = v4();
      frios.push(dados);
      localStorage.setItem("frios", JSON.stringify(frios));
    }
    alert("Tábua de Frios cadastrada com sucesso!");
    router.push("/frios");
  }

  const initialValues = {
    frio: "",
    tipo: "",
    precoUnico: "",
    peso: "",
    estoque: "",
    fornecedor: "",
    dataInclusao: "",
  };

  const validationSchema = Yup.object().shape({
    frio: Yup.string().required("Campo obrigatório"),
    tipo: Yup.string().required("Campo Obrigatório"),
    precoUnico: Yup.string().required("Campo Obrigatório"),
    peso: Yup.string().required("Campo Obrigatório"),
    estoque: Yup.number().required("Campo Obrigatório"),
    fornecedor: Yup.string().required("Campo obrigatório"),
    dataInclusao: Yup.date().required("Campo obrigatório"),
  });

  useEffect(() => {
    if (fornecedores.length > 0) setFornecedorFiltrado(fornecedores);
  }, [fornecedores]);

  return (
    <Pagina>
      <Formik
        initialValues={frioEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          console.log(errors);
          return (
            <Form onSubmit={handleSubmit}>
              <Row className="my-2">
                <Form.Group as={Col}>
                  <Form.Label>Frio:</Form.Label>
                  <Form.Control
                    name="frio"
                    type="text"
                    value={values.frio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.frio && !errors.frio}
                    isInvalid={touched.frio && errors.frio}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.frio}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Tipo:</Form.Label>
                  <Form.Select
                    name="tipo"
                    value={values.tipo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipo && !errors.tipo}
                    isInvalid={touched.tipo && errors.tipo}
                  >
                    <option value="">Selecione:</option>
                    <option value="Tradicional">Tradicional</option>
                    <option value="Gourmet">Gourmet</option>
                    <option value="Rústica">Rústica</option>
                    <option value="Vegana">Vegana</option>
                    <option value="Infantil">Infantil</option>
                    <option value="Queijos">Queijos</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.tipo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Peso:</Form.Label>
                  <InputMask
                    mask="999g"
                    value={values.peso}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="peso"
                        isValid={touched.peso && !errors.peso}
                        isInvalid={touched.peso && errors.peso}
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.peso}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Preço Unitário:</Form.Label>
                  <InputMask
                    mask="R$ 999,99"
                    value={values.precoUnico}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="precoUnico"
                        isValid={touched.precoUnico && !errors.precoUnico}
                        isInvalid={touched.precoUnico && errors.precoUnico}
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.precoUnico}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Estoque</Form.Label>
                  <Form.Control
                    name="estoque"
                    type="number"
                    value={values.estoque}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.estoque && !errors.estoque}
                    isInvalid={touched.estoque && errors.estoque}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.estoque}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Fornecedor:</Form.Label>
                  <Form.Select
                    name="fornecedor"
                    value={values.fornecedor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.fornecedor && !errors.fornecedor}
                    isInvalid={touched.fornecedor && errors.fornecedor}
                  >
                    <option value="">Selecione</option>
                    {fornecedorFiltrado.map((fornecedor) => (
                      <option key={fornecedor.nome} value={fornecedor.nome}>
                        {fornecedor.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.fornecedor}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Data de Inclusão:</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataInclusao"
                    value={values.dataInclusao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataInclusao && !errors.dataInclusao}
                    isInvalid={touched.dataInclusao && errors.dataInclusao}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataInclusao}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="primary" onClick={() => router.push("/frios")}>
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
