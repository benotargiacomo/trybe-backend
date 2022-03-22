SELECT
	M.nome_musica AS nome,
  COUNT(R.id_musica) AS reproducoes
FROM SpotifyClone.musica AS M
INNER JOIN SpotifyClone.reproducao AS R
	ON M.id_musica = R.id_musica
INNER JOIN SpotifyClone.usuario as U
	ON R.id_usuario = U.id_usuario
INNER JOIN SpotifyClone.planos as P
	ON U.id_plano = P.id_plano
WHERE 
	P.nome_plano = 'pessoal' OR
	P.nome_plano = 'gratuito'
GROUP BY nome
ORDER BY nome;