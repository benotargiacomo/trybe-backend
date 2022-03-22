SELECT
	COUNT(R.id_usuario) AS quantidade_musicas_no_historico
FROM SpotifyClone.reproducao AS R
INNER JOIN SpotifyClone.usuario AS U
	ON R.id_usuario = U.id_usuario
WHERE U.usuario = 'Bill';