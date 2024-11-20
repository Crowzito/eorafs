"use client";

import Pagina from "./components/Pagina";
import {
  Card,
  Carousel,
  Col,
  Container,
  Image,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import { useEffect, useState } from "react";

const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
const estoque = JSON.parse(localStorage.getItem("estoque")) || [];

const objeto = [
  {
    caminho: "/clientes/form",
    quantidade: clientes.length,
    nome: "Seja um Cliente!",
    imagem:
      "https://blog.mutt.ind.br/wp-content/uploads/2022/08/Capa-_-Como-abrir-uma-adega-1-1024x576.jpg.webp",
  },
  {
    caminho: "/fornecedores",
    quantidade: fornecedores.length,
    nome: "Conheça nossos Fornecedores!",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHXBltjFA84vlWcYTImLdtyfYMmVnDDORSuw&s",
  },
  {
    caminho: "/pedidos/form",
    quantidade: pedidos.length,
    nome: "Faça seu Pedido!",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmiTNBfZdzfG7DYkotQFrdUp3AHUTt3HdQeQ&s",
  },
];

export default function page() {
  return (
    <Pagina>
      <div className="full-width-carousel mb-4">
        <Carousel indicators={false} controls={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "390px" }}
              src="https://images.tcdn.com.br/img/img_prod/1110779/1651526311_mosaico-vinho-promo.jpg"
              alt="Slide 2"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-30"
              src="https://cdn.dooca.store/31192/files/banner-alta-vinho-branco.jpg?v=1646788890&webp=0https://tpc.googlesyndication.com/simgad/9741072406721062648?"
              alt="Slide 1"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div>
        <Row md={3}>
          {objeto.map((item) => (
            <Col className="py-2" key={item.nome}>
              <Card>
                <Card.Img style={{ height: "230px" }} src={item.imagem} />
                <Card.Body>
                  <Card.Title className="text-center">
                    <b>{item.nome}</b>
                  </Card.Title>
                  <Card.Text className="text-center">
                    Cadastrados: {item.quantidade}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button href={item.caminho}>Ver Mais</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Pagina>
  );
}
