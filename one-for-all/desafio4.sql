SELECT
	U.usuario,
	IF(MAX(YEAR(R.datetime_reproducao)) = '2021', 'Usuário ativo', 'Usuário inativo') AS condicao_usuario
FROM SpotifyClone.usuario AS U
INNER JOIN SpotifyClone.reproducao AS R
  ON U.id_usuario = R.id_usuario
GROUP BY U.usuario
ORDER BY U.usuario;