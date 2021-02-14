
// eslint-disable-next-line no-unused-vars
const getWeddingData = () => {
  const data = {
    tenemos: 4395.75,
    salario: 6000,
    catorcena: 2785.73,
    gastosMensuales: {
      renta: 2850.0,
      carro: 700.0,
      anillo: 100,
      netflixes: 15,
      tarjeta: 50,
      comida: 200,
    },
    costos: {
      // en pesos:
      mobiliario: 10500,
      pista: 7000,
      luces: 2000,
      comida: 14000,
      musica: 8000,
      pastel: 2000,
      iglesia: 1000,
      vino: null,
      flores: null,
      meseros: null,
      recuerditos: null,
      comidaServicio: null, // comida extra (ej tacos, para after, meseros, etc)
      fotografia: null,
      maquillaje: null,
      anillos: null,
    },
  };

  let gastoMensual = 0;
  for (const [, value] of Object.entries(data.gastosMensuales)) {
    gastoMensual += value;
  }

  console.log(
    `Tendremos el dia de la boda: ${
      data.catorcena * 5 - gastoMensual * 3 + data.tenemos
    }`
  );

  return data;
};
