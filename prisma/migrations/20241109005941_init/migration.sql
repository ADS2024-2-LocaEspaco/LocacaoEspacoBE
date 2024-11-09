/*
  Warnings:

  - The primary key for the `anuncio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bairro` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `qtdMaxHospedes` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `tipoEspacoId` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `tipoImovelId` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `anuncio` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `anuncio` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoespaco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoimovel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `anfitriao` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banheiros` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cameras` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comodidade_id` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_checkin` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_checkout` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foto_id` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospedes` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `politica_cancelamento` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicado` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quartos` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regra_da_casa` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seguranca_id` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_espaco_id` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_hospede_id` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_imovel_id` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_reserva_atual` to the `anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_diaria` to the `anuncio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `anuncio` DROP FOREIGN KEY `Anuncio_tipoEspacoId_fkey`;

-- DropForeignKey
ALTER TABLE `anuncio` DROP FOREIGN KEY `Anuncio_tipoImovelId_fkey`;

-- DropForeignKey
ALTER TABLE `anuncio` DROP FOREIGN KEY `Anuncio_userId_fkey`;

-- DropForeignKey
ALTER TABLE `feedback` DROP FOREIGN KEY `Feedback_anuncioId_fkey`;

-- DropForeignKey
ALTER TABLE `feedback` DROP FOREIGN KEY `Feedback_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `anuncio` DROP PRIMARY KEY,
    DROP COLUMN `bairro`,
    DROP COLUMN `cep`,
    DROP COLUMN `cidade`,
    DROP COLUMN `complement`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    DROP COLUMN `numero`,
    DROP COLUMN `qtdMaxHospedes`,
    DROP COLUMN `street`,
    DROP COLUMN `tipoEspacoId`,
    DROP COLUMN `tipoImovelId`,
    DROP COLUMN `title`,
    DROP COLUMN `userId`,
    ADD COLUMN `anfitriao` INTEGER NOT NULL,
    ADD COLUMN `banheiros` INTEGER NOT NULL,
    ADD COLUMN `cameras` BOOLEAN NOT NULL,
    ADD COLUMN `comodidade_id` INTEGER NOT NULL,
    ADD COLUMN `data_checkin` DATETIME(3) NOT NULL,
    ADD COLUMN `data_checkout` DATETIME(3) NOT NULL,
    ADD COLUMN `descricao` VARCHAR(500) NULL,
    ADD COLUMN `foto_id` INTEGER NOT NULL,
    ADD COLUMN `hospedes` INTEGER NOT NULL,
    ADD COLUMN `politica_cancelamento` VARCHAR(100) NOT NULL,
    ADD COLUMN `publicado` BOOLEAN NOT NULL,
    ADD COLUMN `quartos` INTEGER NOT NULL,
    ADD COLUMN `regra_da_casa` VARCHAR(100) NOT NULL,
    ADD COLUMN `seguranca_id` INTEGER NOT NULL,
    ADD COLUMN `tipo_espaco_id` INTEGER NOT NULL,
    ADD COLUMN `tipo_hospede_id` INTEGER NOT NULL,
    ADD COLUMN `tipo_imovel_id` INTEGER NOT NULL,
    ADD COLUMN `tipo_reserva_atual` ENUM('Instantânea', 'Não instantânea') NOT NULL,
    ADD COLUMN `titulo` VARCHAR(50) NULL,
    ADD COLUMN `valor_diaria` DECIMAL NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `feedback`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `tipoespaco`;

-- DropTable
DROP TABLE `tipoimovel`;

-- DropTable
DROP TABLE `user`;

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
