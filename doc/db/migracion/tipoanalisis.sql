INSERT INTO
  museotest.tipoanalisis
  (
    id,
    tipo,
    subtipo,
    valorPredeterminado,
    creacion,
    modifica
  )
  SELECT
    IdTipo,
    Tipo,
    Subtipo,
    ValorPredeter,
    now(),
    now()
FROM bolivia.analisistipo ori
ORDER BY ori.IdTipo ASC;
