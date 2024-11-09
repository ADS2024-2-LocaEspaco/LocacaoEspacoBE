USE stayeasy;

INSERT INTO tipo_imovel (imovel)
VALUES
  ('Casa'),
  ('Apartamento'),
  ('Cabana'),
  ('Conteiner'),
  ('Fazenda'),
  ('Casa ecológica'),
  ('Casa de hóspedes'),
  ('Casa de árvore'),
  ('Tenda');

INSERT INTO tipo_espaco (espaco)
VALUES
  ('Espaço inteiro'),
  ('Quarto privativo'),
  ('Quarto compartilhado');
  
INSERT INTO comodidades (comodidade)
VALUES
  ('Wi-fi'),
  ('TV'),
  ('Cozinha'),
  ('Maquina de Lavar'),
  ('Ar-Condicionado'),
  ('Estacionamento'),
  ('Estacionamento pago'),
  ('Espaço de trabalho'),
  ('Ventilador'),
  ('Piscina'),
  ('Churrasqueira'),
  ('Acesso'),
  ('Mesa de bilhar');

INSERT INTO seguranca (item_seguranca)
VALUES
  ('Detector de fumaça'),
  ('Extintor de incêndio'),
  ('Kit de primeiros socorros'),
  ('Alarme de carbono');
  
SELECT * FROM tipo_imovel;
SELECT * FROM tipo_espaco;
SELECT * FROM comodidades;
SELECT * FROM seguranca;