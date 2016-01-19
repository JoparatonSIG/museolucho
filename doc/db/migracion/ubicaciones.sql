INSERT INTO
       museotest.ubicaciones
       (
         espacio, inmueble, propietario, creacion, modifica, ObraID, LugarId
        )
SELECT
       espacio, inmueble, propietario, now(), now(), IdIdentificacion, IdLugar
FROM original.ubicacion ori
ORDER BY ori.IdIdentificacion ASC;
