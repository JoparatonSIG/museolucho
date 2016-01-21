-- Se carga Niveles
INSERT INTO
  museo.Niveles
   (categoria)
   VALUES
   ('admin'),
   ('empleado'),
   ('visitante');
-- Se carga Usuarios
INSERT INTO
   museo.Usuarios
    ( idNivel, email, nombre, password )
    VALUES
    VALUES
    ( 1, 'lucho@gmail.com', 'lucho', 'mono' },
    { 2, 'bolivia@gmail.com', 'bolivia', 'bolivia' },
    { 2, 'usu1@gmail.com', 'usu1', 'usu1' };
-- Se carga Obras
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
FROM bolivia.identificacion ori
ORDER BY ori.IdIdentificacion ASC;
-- Se carga Naturaleza
INSERT INTO
  museo.Naturaleza
  (
    id,
    naturaleza,
    codigoNaturaleza,
    creacion,
    modifica
  )
  SELECT
    IdNatura,
    Naturaleza,
    CodigoNatura,
    now(),
    now()
FROM bolivia.naturaapoyoiden ori
ORDER BY ori.IdNatura ASC;
-- Se carga Niveles
INSERT INTO
  museo.Museos
   (museo, direccion, telefono, fechaCrea, fechaModifica)
   VALUES
   ('Bolivia', 'Chiquitos', 'telefono', now(), now()),
   ('San Ignacio', 'San Ignacio, Misiones', 'telefono', now(), now());

-- Se carga la nueva tabla Adquisiciones
INSERT INTO
  museo.Adquisiciones
   (tipoAdquisicion, tipoCompra, fecha, fechaCrea, fechaModifica)
   VALUES
   ('No Adquirido','Creado', now(), now(), now()),
   ('Donado','Donado', now(),now(),now()),
   ('Comprado', 'Fondos propios', now(), now(),now()),
   ('Comprado','Fondos externos', now(),now(),now()),
   ('Prestado','Sin rubro',now(),now(),now())
   ;
-- Se agrega la relacion con la nueva tabla Adquisiciones
UPDATE
  museo.Obras
  SET
  AdquisicionId = 1;


-- Relacionamos todas las tuplas con el museo original
-- El nuevo museo es en el modelo nuevo
UPDATE
  museo.Obras
  SET
  MuseoId = 1
  WHERE
  MuseoId IS NULL;
-- Desagregamos codigo y creamos la relacion
-- con la tabla Naturaleza
UPDATE
  museo.Obras
  SET
  NaturalezaId = 1
  WHERE
  codigo like "%-ES-%";

UPDATE
  museo.Obras
  SET
  NaturalezaId = 4
  WHERE
  codigo like "%-EA-%";

UPDATE
  museo.Obras
  SET
  NaturalezaId = 7
  WHERE
  codigo like "%-PC-%";

UPDATE
  museo.Obras
  SET
  NaturalezaId = 10
  WHERE
  codigo like "%-PM-%";

UPDATE
  museo.Obras
  SET
  NaturalezaId = 13
  WHERE
  codigo like "%-MO-%";

UPDATE
  museo.Obras
  SET
  NaturalezaId = 15
  WHERE
  codigo like "%-MA-%";

UPDATE
  museo.Obras
  SET
  NaturalezaId = 18
  WHERE
  codigo like "%-ME-%";

UPDATE
    museo.Obras
    SET
    NaturalezaId = 21
    WHERE
    codigo like "%-PL-%";

UPDATE
    museo.Obras
    SET
    NaturalezaId = 24
    WHERE
    codigo like "%-IN-%";

UPDATE
    museo.Obras
    SET
    NaturalezaId = 28
    WHERE
    codigo like "%-VA-%";
-- Se crea la relacion con el usuario que creo
-- o registro la obra, todas la tuplas
-- originales van a un solo usuario
UPDATE
  museo.Obras
  SET
  UsuarioId = 2;


-- antiguos
INSERT INTO
       museo.Lugares
       (
        id, localidad, codigoLocalidad, municipio, provincia, codigoProvincia, departamento, creacion, modifica
        )
SELECT
      IdLugar, localidad, codigoLocalidad, municipio, provincia, codigoProvincia, departamento, now(), now()
FROM bolivia.lugar ori
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
FROM bolivia.ubicacion ori
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
FROM bolivia.analisistipo ori
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
FROM bolivia.tecnicar ori
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
FROM bolivia.tecnica ori
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
FROM bolivia.relevamiento ori
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
FROM bolivia.fotografias ori
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
FROM bolivia.estructura ori
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
FROM bolivia.espacios ori
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
FROM bolivia.descripcion ori
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
FROM bolivia.conservacion ori
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
FROM bolivia.analisis ori
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
FROM bolivia.accesorios ori
LEFT OUTER JOIN museo.Obras o
  ON (ori.IdIdentificacion = o.id)
ORDER BY ori.IdIdentificacion ASC;
