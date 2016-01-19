INSERT INTO
  museotest.analisis
  (
    analisis,
    ObraId,
    TipoAnalisisId,
    creacion,
    modifica
  )
  SELECT
    Analisis,
    IdIdentificacion,
    IdTipo,
    now(),
    now()
FROM museojesuitico.analisis ori
ORDER BY ori.IdIdentificacion ASC;