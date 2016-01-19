INSERT INTO
       museotest.fotografias
       (
        id, ObraId, foto, codArchivoFotografico, numRollo, numFoto, fotografo, fecha, creacion, modifica
        )
SELECT
      IdFotografías, IdIdentificacion, foto, codArchivoFotografico, numRollo, numFoto, fotografo, fecha, now(), now()
FROM original.fotografias ori
ORDER BY ori.IdFotografías ASC;
