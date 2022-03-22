SELECT
	M.nome_musica AS cancao,
  COUNT(R.id_musica) AS reproducoes
FROM SpotifyClone.musica AS M
INNER JOIN SpotifyClone.reproducao AS R
	ON M.id_musica = R.id_musica
GROUP BY M.id_musica
ORDER BY reproducoes DESC, M.nome_musica 
LIMIT 2;