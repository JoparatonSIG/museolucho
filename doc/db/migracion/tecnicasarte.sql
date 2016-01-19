INSERT INTO
  museotest.tecnicasarte
  (
    id,
    tecnicaArte,
    creacion,
    modifica
  )
  SELECT
    IdTecnica,
    Tecnica,
    now(),
    now()
FROM bolivia.tecnicar ori
ORDER BY ori.IdTecnica ASC;
