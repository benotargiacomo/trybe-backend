SELECT
	M.nome_musica,
CASE
	WHEN M.nome_musica LIKE '%Streets' THEN REPLACE(M.nome_musica, 'Streets', 'Code Review')
  WHEN M.nome_musica LIKE '%Her Own' THEN REPLACE(M.nome_musica, 'Her Own', 'Trybe')
  WHEN M.nome_musica LIKE '%Inner Fire' THEN REPLACE(M.nome_musica, 'Inner Fire', 'Project')
  WHEN M.nome_musica LIKE '%Silly' THEN REPLACE(M.nome_musica, 'Silly', 'Nice')
  WHEN M.nome_musica LIKE '%Circus' THEN REPLACE(M.nome_musica, 'Circus', 'Pull Request')
END AS novo_nome
FROM SpotifyClone.musica AS M
WHERE
	M.nome_musica LIKE '%Streets' OR
	M.nome_musica LIKE '%Her Own' OR
	M.nome_musica LIKE '%Inner Fire' OR
	M.nome_musica LIKE '%Silly' OR
	M.nome_musica LIKE '%Circus'
ORDER BY M.nome_musica;