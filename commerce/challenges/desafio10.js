db.produtos.find({
  valoresNutricionais: {
    $elemMatch: {
      tipo: "proteínas",
      percentual: { $gte: 30, $lte: 500 },
    },
  },
}, { nome: 1, _id: 0 });