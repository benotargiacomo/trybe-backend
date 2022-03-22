SELECT
	Art.nome_artista AS artista,
  Alb.nome_album AS album,
  COUNT(S.id_artista) AS seguidores
FROM SpotifyClone.artista AS Art
INNER JOIN SpotifyClone.album AS Alb
	ON Art.id_artista = Alb.id_artista
INNER JOIN SpotifyClone.seguidores as S
	ON Art.id_artista = S.id_artista
GROUP BY album, artista
ORDER BY seguidores DESC, artista, album;