const pelis = require("./pelis");
const parsearArgumentos = (argv) => {
  const respuesta = {};
  argv.forEach(function (item, ind) {
    const valorObjeto = 0;
    if (item.startsWith("--")) {
      const nombreSinGuiones = item.slice(2);
      respuesta[nombreSinGuiones] = argv[ind + 1];
    }
  });
  return respuesta;
};

function main() {
  const argParseados = parsearArgumentos(process.argv.slice(2));
  console.log(pelis.searchByCriteria(argParseados));
}

main();
