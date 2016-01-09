SELECT m.Naturaleza, cp.Especialidad
FROM naturaapoyoiden as m
INNER JOIN apoyonaturaespecie as p
    ON m.IdNatura = p.IdNatura
INNER JOIN especiapoyoiden as cp
    ON p.IdEspecie = cp.IdEspecie
WHERE cp.id_category = 'some value'
