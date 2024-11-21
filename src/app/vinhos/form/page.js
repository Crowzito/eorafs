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
import styles from "@/app/Form.module.css";

export default function VinhosFormPage(props) {
  const [fornecedorFiltrado, setFornecedorFiltrado] = useState([]);

  const router = useRouter();
  const [novoTipo, setNovoTipo] = useState("");

  const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
  const vinhos = JSON.parse(localStorage.getItem("vinhos")) || [];
  const id = props.searchParams.id;
  const vinhoEditado = vinhos.find((item) => item.id == id);

  function salvar(dados) {
    if (vinhoEditado) {
      Object.assign(vinhoEditado, dados);
      localStorage.setItem("vinhos", JSON.stringify(vinhos));
    } else {
      dados.id = v4();
      vinhos.push(dados);
      localStorage.setItem("vinhos", JSON.stringify(vinhos));
    }
    alert("Vinho adicionado com sucesso!");
    router.push("/vinhos");
  }

  const initialValues = {
    vinho: "",
    tipo: "",
    precoUnico: "",
    safra: "",
    teorAlco: "",
    estoque: "",
    fornecedor: "",
    dataInclusao: "",
  };

  const validationSchema = Yup.object().shape({
    vinho: Yup.string().required("Campo obrigatório"),
    tipo: Yup.string().required("Campo Obrigatório"),
    precoUnico: Yup.string().required("Campo Obrigatório"),
    safra: Yup.string().required("Campo Obrigatório"),
    teorAlco: Yup.string().required("Campo Obrigatório"),
    estoque: Yup.number().required("Campo Obrigatório"),
    fornecedor: Yup.string().required("Campo obrigatório"),
    dataInclusao: Yup.date().required("Campo obrigatório"),
  });

  const handleAddTipo = (e, setFieldValue, values) => {
    e.preventDefault();
    if (novoTipo.trim()) {
      setFieldValue("tipo", [...values.tipo, novoTipo]);
      setNovoTipo("");
    }
  };

  useEffect(() => {
    if (fornecedores.length > 0) setFornecedorFiltrado(fornecedores);
  }, [fornecedores]);

  return (
    <Pagina>
      <div className={styles["form-container"]}>
        <Formik
          initialValues={vinhoEditado || initialValues}
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
            setFieldValue,
          }) => {
            console.log(errors);
            return (
              <Form onSubmit={handleSubmit}>
                <Row className="my-2">
                  <Form.Group as={Col}>
                    <Form.Label className={styles["form-label"]}>
                      Vinho:
                    </Form.Label>
                    <Form.Control
                      className={styles["form-input"]}
                      name="vinho"
                      type="text"
                      value={values.vinho}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.vinho && !errors.vinho}
                      isInvalid={touched.vinho && errors.vinho}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.vinho}
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
                      <option value="Tinto">Tinto</option>
                      <option value="Branco">Branco</option>
                      <option value="Rosé">Rosé</option>
                      <option value="Espumante">Espumante</option>
                      <option value="Sobremesa">Sobremesa</option>
                      <option value="Verde">Verde</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.tipo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label className={styles["form-label"]}>
                      Safra:
                    </Form.Label>
                    <Form.Control
                      className={styles["form-input"]}
                      name="safra"
                      type="number"
                      placeholder="Ano: aaaa"
                      value={values.safra}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.safra && !errors.safra}
                      isInvalid={touched.safra && errors.safra}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.safra}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label className={styles["form-label"]}>
                      Teor Alcoólico:
                    </Form.Label>
                    <InputMask
                      mask="99%"
                      value={values.teorAlco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {(inputProps) => (
                        <Form.Control
                          {...inputProps}
                          className={styles["form-input"]}
                          name="teorAlco"
                          isValid={touched.teorAlco && !errors.teorAlco}
                          isInvalid={touched.teorAlco && errors.teorAlco}
                        />
                      )}
                    </InputMask>
                    <Form.Control.Feedback type="invalid">
                      {errors.teorAlco}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Labe className={styles["form-label"]} l>
                      Preço Unitário:
                    </Form.Labe>
                    <InputMask
                      mask="R$ 999,99"
                      value={values.precoUnico}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {(inputProps) => (
                        <Form.Control
                          {...inputProps}
                          className={styles["form-input"]}
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
                    <Form.Label className={styles["form-label"]}>
                      Estoque
                    </Form.Label>
                    <Form.Control
                      className={styles["form-input"]}
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
                    <Form.Label className={styles["form-label"]}>
                      Fornecedor:
                    </Form.Label>
                    <Form.Select
                      className={styles["form-input"]}
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
                    <Form.Label className={styles["form-label"]}>
                      Data de Inclusão:
                    </Form.Label>
                    <Form.Control
                      className={styles["form-input"]}
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
                  <Button
                    variant="primary"
                    onClick={() => router.push("/vinhos")}
                  >
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
      </div>
    </Pagina>
  );
}
