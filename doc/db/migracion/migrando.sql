INSERT INTO
  museo.Obras
  (
    id,
    numero,
    codigo,
    codigoAnterior1,
    codigoAnterior2,
    denominacion,
    especialidad,
    epoca,
    autor,
    funcionOriginal,
    tecnicaMaterial,
    origen,
    creacion,
    modifica
  )
  SELECT
    IdIdentificacion,
    Numero,
    Codigo,
    CodigoAnterior1,
    CodigoAnterior2,
    Denominacion,
    Especialidad,
    Epoca,
    Autor,
    FuncionOriginal,
    TecnicaMaterial,
    Origen,
    now(),
    now()
FROM museoOriginal.identificacion ori
ORDER BY ori.IdIdentificacion ASC;

INSERT INTO
       museo.Lugares
       (
        id, localidad, codigoLocalidad, municipio, provincia, codigoProvincia, departamento, creacion, modifica
        )
SELECT
      IdLugar, localidad, codigoLocalidad, municipio, provincia, codigoProvincia, departamento, now(), now()
FROM museoOriginal.lugar ori
ORDER BY ori.IdLugar ASC;

INSERT INTO
       museo.Ubicaciones
       (
         ObraId,
         LugarId,
         espacio,
         inmueble,
         propietario,
         creacion,
         modifica
        )
SELECT
  ori.IdIdentificacion,
  ori.IdLugar,
  ori.Espacio,
  ori.Inmueble,
  ori.Propietario,
  now(),
  now()
FROM museoOriginal.ubicacion ori
LEFT OUTER JOIN museo.Obras o
  ON (ori.IdIdentificacion = o.id)
LEFT OUTER JOIN museo.Lugares l
  ON (ori.IdIdentificacion = l.id)
ORDER BY ori.IdIdentificacion ASC;

INSERT INTO
  museo.TipoAnalisis
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
FROM museoOriginal.analisistipo ori
ORDER BY ori.IdTipo ASC;

INSERT INTO
  museo.TecnicasArte
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
FROM museoOriginal.tecnicar ori
ORDER BY ori.IdTecnica ASC;

INSERT INTO
  museo.Tecnicas
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
FROM museoOriginal.tecnica ori
ORDER BY ori.IdTecnica ASC;

INSERT INTO
  museo.Relevamientos
  (
    ObraId,
    fechaRelev,
    fechaCatalog,
    fechaRevision,
    quienRelevo,
    quienCatalogo,
    quienReviso,
    observaciones,
    creacion,
    modifica
  )
  SELECT
    IdIdentificacion,
    FechaRelev,
    FechaCatalog,
    FechaRevision,
    QienRelevo,
    QuienCatalogo,
    QuienReviso,
    observaciones,
      now(),
      now()
FROM museoOriginal.relevamiento ori
LEFT OUTER JOIN museo.Obras o
  ON (ori.IdIdentificacion = o.id)
ORDER BY ori.IdIdentificacion ASC;

INSERT INTO
       museo.Fotografias
       (
        id, ObraId, foto, codArchivoFotografico, numRollo, numFoto, fotografo, fecha, creacion, modifica
        )
SELECT
      IdFotografías, IdIdentificacion, Foto, CodArchivoFotografico, NumRollo, NumFoto, Fotografo, Fecha, now(), now()
FROM museoOriginal.fotografias ori
LEFT OUTER JOIN museo.Obras o
  ON (ori.IdIdentificacion = o.id)
ORDER BY ori.IdFotografías ASC;

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

INSERT INTO
  museo.Espacios
  (
    id,
    espacio,
    codigoEspacio,
    inmuebles,
    codigoInmueble,
    ubicacionInmueble,
    creacion,
    modifica
  )
  SELECT
  IdEspacio,
  Espacio,
  CodigoEspacio,
  Inmuebles,
  CodigoInmueble,
  UbicaciónInmueble,
    now(),
    now()
FROM museoOriginal.espacios ori
ORDER BY ori.IdEspacio ASC;

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

INSERT INTO
  museo.Conservaciones
  (
    id,
    ObraId,
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

INSERT INTO
  museo.Analisis
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
FROM museoOriginal.analisis ori
LEFT OUTER JOIN museo.Obras o
  ON (ori.IdIdentificacion = o.id)
LEFT OUTER JOIN museo.TipoAnalisis l
  ON (ori.IdIdentificacion = l.id)
ORDER BY ori.IdIdentificacion ASC;

INSERT INTO
       museo.Accesorios
       (
       id, ObraId, objetoCodigo, relacion, creacion, modifica
       )
SELECT
      IdAccesorios, IdIdentificacion, ObjetoCodigo, Relacion, now(), now()
FROM museoOriginal.accesorios ori
LEFT OUTER JOIN museo.Obras o
  ON (ori.IdIdentificacion = o.id)
ORDER BY ori.IdIdentificacion ASC;
