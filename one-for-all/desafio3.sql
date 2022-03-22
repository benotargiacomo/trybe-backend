SELECT
	U.usuario,
  COUNT(R.id_usuario) AS qtde_musicas_ouvidas,
  ROUND(SUM(M.duracao_segundos) / 60, 2) AS total_minutos
FROM SpotifyClone.usuario AS U
INNER JOIN SpotifyClone.reproducao AS R
  ON U.id_usuario = R.id_usuario
INNER JOIN SpotifyClone.musica AS M
  ON R.id_musica = M.id_musica
GROUP BY U.usuario
ORDER BY U.usuario;