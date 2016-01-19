INSERT INTO
  museo.Estructuras
  (
    id,
    estructura,
    creacion,
    modifica
  )
  SELECT
  IdEstructura,
  Estructura,
    now(),
    now()
FROM museoOriginal.estructura ori
ORDER BY ori.IdEstructura ASC;
