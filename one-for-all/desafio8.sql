SELECT
	Art.nome_artista AS artista,
    Alb.nome_album as album
FROM SpotifyClone.artista AS Art
INNER JOIN SpotifyClone.album AS Alb
	ON Art.id_artista = Alb.id_artista
WHERE nome_artista = "Walter Phoenix"
ORDER BY album;