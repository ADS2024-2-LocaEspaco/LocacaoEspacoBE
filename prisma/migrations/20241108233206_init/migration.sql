/*
  Warnings:

  - You are about to alter the column `valor_diaria` on the `anuncio` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `nota_limpeza` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `nota_exatidao_anuncio` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `nota_custo_beneficio` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `nota_localizacao` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `nota_seguiu_regras` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `nota_pontualidade` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `nota_cordialidade` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `anuncio` MODIFY `valor_diaria` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `avaliacao` MODIFY `nota_limpeza` DECIMAL NULL,
    MODIFY `nota_exatidao_anuncio` DECIMAL NULL,
    MODIFY `nota_custo_beneficio` DECIMAL NULL,
    MODIFY `nota_localizacao` DECIMAL NULL,
    MODIFY `nota_seguiu_regras` DECIMAL NULL,
    MODIFY `nota_pontualidade` DECIMAL NULL,
    MODIFY `nota_cordialidade` DECIMAL NULL;
