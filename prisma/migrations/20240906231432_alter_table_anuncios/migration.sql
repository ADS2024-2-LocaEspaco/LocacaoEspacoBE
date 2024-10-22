-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    `fullname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `phone` VARCHAR(11) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `cep` VARCHAR(8) NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anuncio` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(40) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `Cidade` VARCHAR(100) NOT NULL,
    `cep` VARCHAR(100) NOT NULL,
    `numero` INTEGER NOT NULL,
    `complement` VARCHAR(100) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `description` VARCHAR(500) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tipoImovelId` VARCHAR(191) NOT NULL,
    `tipoEspacoId` VARCHAR(191) NOT NULL,
    `qtdMaxHospedes` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoImovel` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoEspaco` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feedback` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(30) NOT NULL,
    `nota` INTEGER NOT NULL,
    `anuncioId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anuncio` ADD CONSTRAINT `Anuncio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anuncio` ADD CONSTRAINT `Anuncio_tipoImovelId_fkey` FOREIGN KEY (`tipoImovelId`) REFERENCES `TipoImovel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anuncio` ADD CONSTRAINT `Anuncio_tipoEspacoId_fkey` FOREIGN KEY (`tipoEspacoId`) REFERENCES `TipoEspaco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_anuncioId_fkey` FOREIGN KEY (`anuncioId`) REFERENCES `Anuncio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
