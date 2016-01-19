INSERT INTO
  museo.Descripciones
  (
    id,
    ObraId,
    marcasInscripciones,
    alto,
    ancho,
    longitud,
    profundidad,
    diametro,
    espesor,
    peso,
    observaciones,
    descripcion,
    creacion,
    modifica
  )
  SELECT
  IdDescripcion,
  IdIdentificacion,
  MarcasInscripciones,
  DimAlto,
  DimAncho,
  DimLongitud,
  DimProfundidad,
  DimDiametro,
  DimEspesor,
  DimPeso,
  Observaciones,
  Descripcion,
    now(),
    now()
FROM museoOriginal.descripcion ori
LEFT OUTER JOIN museo.Obras o
  ON (ori.IdIdentificacion = o.id)
ORDER BY ori.IdDescripcion ASC;
