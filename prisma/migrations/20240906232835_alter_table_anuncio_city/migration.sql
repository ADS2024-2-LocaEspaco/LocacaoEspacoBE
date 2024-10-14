/*
  Warnings:

  - You are about to drop the column `Cidade` on the `anuncio` table. All the data in the column will be lost.
  - Added the required column `cidade` to the `Anuncio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `anuncio` DROP COLUMN `Cidade`,
    ADD COLUMN `cidade` VARCHAR(100) NOT NULL;
