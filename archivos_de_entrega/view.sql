CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `trailerflix`.`new_view` AS
    SELECT 
        `t`.`id` AS `id`,
        `t`.`poster` AS `poster`,
        `t`.`titulo` AS `titulo`,
        `c`.`categoria` AS `categoria`,
        GROUP_CONCAT(DISTINCT `g`.`genero`
            SEPARATOR ', ') AS `generos`,
        `t`.`resumen` AS `resumen`,
        `t`.`temporadas` AS `temporadas`,
        GROUP_CONCAT(DISTINCT `a`.`actor`
            SEPARATOR ', ') AS `actores`,
        `t`.`trailer` AS `trailer`
    FROM
        (((((`trailerflix`.`titulos` `t`
        JOIN `trailerflix`.`categorias` `c`)
        JOIN `trailerflix`.`generos` `g`)
        JOIN `trailerflix`.`actores` `a`)
        JOIN `trailerflix`.`genero_titulo` `gt`)
        JOIN `trailerflix`.`reparto` `r`)
    WHERE
        ((`t`.`id` = `gt`.`idTitulo`)
            AND (`t`.`id` = `r`.`idTitulo`)
            AND (`t`.`categoria` = `c`.`id`)
            AND (`gt`.`idGenero` = `g`.`id`)
            AND (`a`.`id` = `r`.`idActor`))
    GROUP BY `t`.`id`