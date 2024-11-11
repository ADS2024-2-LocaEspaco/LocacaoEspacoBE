-- CreateTable
CREATE TABLE `anuncio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foto_id` INTEGER NOT NULL,
    `titulo` VARCHAR(50) NULL,
    `hospedes` INTEGER NOT NULL,
    `quartos` INTEGER NOT NULL,
    `banheiros` INTEGER NOT NULL,
    `descricao` VARCHAR(500) NULL,
    `valor_diaria` DECIMAL NOT NULL,
    `publicado` BOOLEAN NOT NULL,
    `data_checkin` DATETIME(3) NOT NULL,
    `data_checkout` DATETIME(3) NOT NULL,
    `cameras` BOOLEAN NOT NULL,
    `regra_da_casa` VARCHAR(100) NOT NULL,
    `politica_cancelamento` VARCHAR(100) NOT NULL,
    `tipo_reserva_atual` ENUM('Instantânea', 'Não instantânea') NOT NULL,
    `anfitriao` INTEGER NOT NULL,
    `comodidade_id` INTEGER NOT NULL,
    `tipo_imovel_id` INTEGER NOT NULL,
    `tipo_espaco_id` INTEGER NOT NULL,
    `seguranca_id` INTEGER NOT NULL,
    `tipo_hospede_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comodidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comodidade` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_imovel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imovel` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_espaco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `espaco` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seguranca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_seguranca` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_hospede` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospede` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avaliacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario_avaliador` INTEGER NOT NULL,
    `id_usuario_avaliado` INTEGER NULL,
    `id_anuncio_avaliado` INTEGER NULL,
    `nota_limpeza` DECIMAL NULL,
    `nota_exatidao_anuncio` DECIMAL NULL,
    `nota_custo_beneficio` DECIMAL NULL,
    `nota_localizacao` DECIMAL NULL,
    `comentario` VARCHAR(255) NOT NULL,
    `nota_seguiu_regras` DECIMAL NULL,
    `nota_pontualidade` DECIMAL NULL,
    `nota_cordialidade` DECIMAL NULL,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NULL,
    `id_anuncio` INTEGER NULL,
    `cep` VARCHAR(10) NOT NULL,
    `estado` VARCHAR(2) NOT NULL,
    `cidade` VARCHAR(50) NOT NULL,
    `bairro` VARCHAR(50) NOT NULL,
    `rua` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(4) NULL,
    `complemento` VARCHAR(255) NULL,
    `latitude` VARCHAR(50) NULL,
    `longitude` VARCHAR(50) NULL,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favoritos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NULL,
    `id_anuncio` INTEGER NULL,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foto` VARCHAR(255) NULL,
    `nome` VARCHAR(50) NOT NULL,
    `nome_completo` VARCHAR(150) NULL,
    `email` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(14) NULL,
    `telefone` VARCHAR(14) NULL,
    `admin` BOOLEAN NULL DEFAULT false,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ativo` BOOLEAN NULL DEFAULT true,
    `url_documento` VARCHAR(255) NULL,
    `bloqueado` BOOLEAN NULL DEFAULT false,
    `token_acesso` VARCHAR(255) NOT NULL,
    `avaliacao_id` INTEGER NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dados_bancarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `banco` VARCHAR(50) NOT NULL,
    `agencia` VARCHAR(50) NOT NULL,
    `numero_conta` VARCHAR(20) NOT NULL,
    `tipo_conta` VARCHAR(15) NOT NULL,
    `chave_pix` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lista_favoritos_personalizada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NULL,
    `id_anuncio` INTEGER NULL,
    `nome` VARCHAR(20) NULL,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NULL,
    `id_anuncio` INTEGER NULL,
    `qtd_adultos` INTEGER NULL,
    `qtd_criancas` INTEGER NULL,
    `qtd_bebes` INTEGER NULL,
    `qtd_pets` INTEGER NULL,
    `data_inicial` DATETIME(3) NULL,
    `data_final` DATETIME(3) NULL,
    `status_reserva` ENUM('Reservado', 'Processando') NULL,
    `status_pagamento` ENUM('Concluído', 'Aguardando') NULL,
    `multa` BOOLEAN NULL DEFAULT false,
    `cancelamento` BOOLEAN NULL DEFAULT false,
    `criado_em` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `anuncio_foto_id_fkey` FOREIGN KEY (`foto_id`) REFERENCES `fotos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `fk_anfitriao` FOREIGN KEY (`anfitriao`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `anuncio_comodidade_id_fkey` FOREIGN KEY (`comodidade_id`) REFERENCES `comodidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `anuncio_tipo_imovel_id_fkey` FOREIGN KEY (`tipo_imovel_id`) REFERENCES `tipo_imovel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `anuncio_tipo_espaco_id_fkey` FOREIGN KEY (`tipo_espaco_id`) REFERENCES `tipo_espaco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `anuncio_seguranca_id_fkey` FOREIGN KEY (`seguranca_id`) REFERENCES `seguranca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anuncio` ADD CONSTRAINT `anuncio_tipo_hospede_id_fkey` FOREIGN KEY (`tipo_hospede_id`) REFERENCES `tipo_hospede`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacao` ADD CONSTRAINT `fk_usuario_avaliado` FOREIGN KEY (`id_usuario_avaliado`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `avaliacao` ADD CONSTRAINT `fk_usuario_avaliador` FOREIGN KEY (`id_usuario_avaliador`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `endereco` ADD CONSTRAINT `endereco_id_anuncio_fkey` FOREIGN KEY (`id_anuncio`) REFERENCES `anuncio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `endereco` ADD CONSTRAINT `endereco_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_id_anuncio_fkey` FOREIGN KEY (`id_anuncio`) REFERENCES `anuncio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_avaliacao` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacao`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dados_bancarios` ADD CONSTRAINT `dados_bancarios_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lista_favoritos_personalizada` ADD CONSTRAINT `lista_favoritos_personalizada_id_anuncio_fkey` FOREIGN KEY (`id_anuncio`) REFERENCES `anuncio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lista_favoritos_personalizada` ADD CONSTRAINT `lista_favoritos_personalizada_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reserva` ADD CONSTRAINT `fk_anuncio` FOREIGN KEY (`id_anuncio`) REFERENCES `anuncio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reserva` ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
