INSERT INTO
  museotest.tecnicas
  (
    id,
    tecnica,
    creacion,
    modifica
  )
  SELECT
    IdTecnica,
    Tecnica,
    now(),
    now()
FROM bolivia.tecnica ori
ORDER BY ori.IdTecnica ASC;
