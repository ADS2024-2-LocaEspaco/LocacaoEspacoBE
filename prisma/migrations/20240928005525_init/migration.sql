-- CreateTable
CREATE TABLE `anuncio` (
    `id` INTEGER NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `tipo_espaco_id` INTEGER NOT NULL,
    `tipo_imoveis_id` INTEGER NOT NULL,
    `titulo` VARCHAR(40) NOT NULL,
    `descricao` VARCHAR(500) NOT NULL,
    `quant_quartos` BIGINT NOT NULL,
    `quant_banheiro` BIGINT NOT NULL,
    `quant_cama` BIGINT NOT NULL,
    `quant_hospede` BIGINT NOT NULL,
    `url_imgs` VARCHAR(500) NOT NULL,
    `cftv` BOOLEAN NULL DEFAULT false,
    `monitoramento_ruido` BOOLEAN NULL DEFAULT false,
    `armas` BOOLEAN NULL DEFAULT false,
    `aprovacao_reserva` BOOLEAN NULL DEFAULT false,
    `aceita_crianca` BOOLEAN NULL DEFAULT false,
    `aceita_bebe` BOOLEAN NULL DEFAULT false,
    `aceita_pet` BOOLEAN NULL DEFAULT false,
    `quant_pet` BIGINT NULL DEFAULT 0,
    `valor_diaria` VARCHAR(255) NOT NULL,
    `quant_diaria_min` BIGINT NULL DEFAULT 1,
    `quant_diaria_max` BIGINT NULL DEFAULT 1,
    `permite_eventos` BOOLEAN NULL DEFAULT false,
    `permite_fumar` BOOLEAN NULL DEFAULT false,
    `horario_silencio` BOOLEAN NULL DEFAULT false,
    `horario_silencio_inicio` TIME(6) NULL,
    `horario_silencio_fim` TIME(6) NULL,
    `fotografia_comercial` BOOLEAN NULL DEFAULT false,
    `checkin_inicio` TIME(6) NOT NULL,
    `checkin_fim` TIME(6) NULL,
    `checkout` TIME(6) NOT NULL,
    `polit_cancelamento` BIGINT NOT NULL,
    `regras_adicionais` VARCHAR(500) NULL,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `publicado` BOOLEAN NULL DEFAULT false,
    `temp_antec_reserva` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avaliacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservas_id` INTEGER NOT NULL,
    `avaliado` BIGINT NOT NULL,
    `nota_limpeza` VARCHAR(255) NULL,
    `nota_exatidao_anuncio` VARCHAR(255) NULL,
    `nota_custo_beneficio` VARCHAR(255) NULL,
    `nota_localizacao` VARCHAR(255) NULL,
    `comentario` VARCHAR(350) NOT NULL,
    `nota_seguiu_regras` VARCHAR(255) NULL,
    `nota_pontualidade` VARCHAR(255) NULL,
    `nota_cordialidade` VARCHAR(255) NULL,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias_comodidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `tipo_cat_comod`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comodidade_anuncio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comodidades_id` INTEGER NOT NULL,
    `anuncio_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comodidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categorias_comodidade_id` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `icone` VARCHAR(500) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anuncio_id` INTEGER NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(255) NOT NULL,
    `bairro` VARCHAR(255) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `estado` VARCHAR(2) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `complemento` VARCHAR(255) NULL,
    `cep` VARCHAR(10) NOT NULL,
    `longitude` VARCHAR(50) NULL,
    `latitude` VARCHAR(50) NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favoritos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lista_favoritos_id` INTEGER NOT NULL,
    `anuncio_id` INTEGER NOT NULL,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instituicao_financeira` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `codigo_instituicao` BIGINT NOT NULL,
    `nome_instituicao` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `codigo`(`codigo_instituicao`),
    UNIQUE INDEX `instituicao`(`nome_instituicao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lista_favoritos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` VARCHAR(191) NOT NULL,
    `nome_lista` VARCHAR(120) NOT NULL,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anuncio_id` INTEGER NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `data_inicial` DATE NOT NULL,
    `data_final` DATE NOT NULL,
    `num_adultos` BIGINT NULL,
    `num_criancas` BIGINT NULL,
    `num_bebes` BIGINT NULL,
    `num_pets` BIGINT NULL,
    `valor_reserva` VARCHAR(255) NOT NULL,
    `num_cartao` VARCHAR(16) NOT NULL,
    `checkin` DATETIME(3) NULL,
    `checkout` DATETIME(3) NULL,
    `status_reserva` BIGINT NULL,
    `status_pagamento` BIGINT NULL,
    `multa` BOOLEAN NULL,
    `cancelamento` BOOLEAN NULL,
    `solicitante_cancelamento` VARCHAR(25) NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_espaco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `tipo_espaco_un`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_imoveis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `tipo_imovel`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` VARCHAR(191) NOT NULL,
    `instituicao_financeira_id` BIGINT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `img` VARCHAR(500) NULL,
    `nome_completo` VARCHAR(250) NOT NULL,
    `email` VARCHAR(250) NOT NULL,
    `fone` BIGINT NULL,
    `cpf` VARCHAR(14) NULL,
    `ag` BIGINT NULL,
    `cc` VARCHAR(12) NULL,
    `admin` BOOLEAN NULL DEFAULT false,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ativo` BOOLEAN NULL DEFAULT true,
    `url_documento` VARCHAR(500) NULL,
    `bloqueado` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `email_unq`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `anuncio_fk1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `anuncio_fk2` FOREIGN KEY (`tipo_espaco_id`) REFERENCES `tipo_espaco`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `anuncio_fk3` FOREIGN KEY (`tipo_imoveis_id`) REFERENCES `tipo_imoveis`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `avaliacao` ADD CONSTRAINT `avaliacao_fk1` FOREIGN KEY (`reservas_id`) REFERENCES `reservas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comodidade_anuncio` ADD CONSTRAINT `comodidade_anuncio_fk1` FOREIGN KEY (`comodidades_id`) REFERENCES `comodidades`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comodidade_anuncio` ADD CONSTRAINT `comodidade_anuncio_fk2` FOREIGN KEY (`anuncio_id`) REFERENCES `anuncio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comodidades` ADD CONSTRAINT `comodidades_fk1` FOREIGN KEY (`categorias_comodidade_id`) REFERENCES `categorias_comodidade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `endereco` ADD CONSTRAINT `endereco_fk1` FOREIGN KEY (`anuncio_id`) REFERENCES `anuncio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `endereco` ADD CONSTRAINT `endereco_fk2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_fk1` FOREIGN KEY (`lista_favoritos_id`) REFERENCES `lista_favoritos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_fk2` FOREIGN KEY (`anuncio_id`) REFERENCES `anuncio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lista_favoritos` ADD CONSTRAINT `lista_favoritos_fk1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_fk1` FOREIGN KEY (`anuncio_id`) REFERENCES `anuncio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_fk2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_fk1` FOREIGN KEY (`instituicao_financeira_id`) REFERENCES `instituicao_financeira`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
