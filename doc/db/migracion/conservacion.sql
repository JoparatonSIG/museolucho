INSERT INTO
  museo.Conservaciones
  (
    id,
    ObraId;
    conservacion,
    condicionesSeguridad,
    creacion,
    modifica
  )
  SELECT
    IdConservacion,
    IdIdentificacion,
    Conservacion,
    CondicionesSeguridad,
    now(),
    now()
FROM museoOriginal.conservacion ori
LEFT OUTER JOIN museo.Obras o
  ON (ori.IdIdentificacion = o.id)
ORDER BY ori.IdConservacion ASC;
