INSERT INTO
       museotest.accesorios       
       (
       id, ObraId, objetoCodigo, relacion, creacion, modifica
       )       
SELECT
      IdAccesorios, IdIdentificacion, ObjetoCodigo, Relacion, now(), now()      
FROM museojesuitico.accesorios ori
ORDER BY ori.IdAccesorios ASC;

