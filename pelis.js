const fs = require("fs");
const {argv} = require("process");
const peliculas = fs.readFileSync(__dirname +"/pelis.json");

const getAll = () => {
    return getPeliculas();
}

const getPeliculas = () => {
    const peliculaToString = peliculas.toString();
    const peliculaObjeto = JSON.parse(peliculaToString);
    return peliculaObjeto;
};

const sortBy = (propiedad, arrayDePelis) => {
    if (propiedad.sort == "title") {
        return arrayDePelis.sort(function (a, b) {
            if(a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });
    } else if (propiedad.sort == "rating") {
        return arrayDePelis.sort((a, b) => a.rating -b.rating);
    }
};

const searchByName = (texto, arrayDePelis) => {
    const contenido = texto.search;
    return arrayDePelis.filter(function (item) {
        const expresion = new RegExp(contenido, "i");
        return item.title.match(expresion);
    });
};

const searchByTag = (texto, arrayDePelis = getPeliculas()) => {
    const contenido = texto.tag;
    var arrWithTags = [];
    const expresion = new RegExp(contenido, "i");
    for (let i = 0; i < arrayDePelis.length; i++) {
        for (let k = 0; k < arrayDePelis[i].tags.length; k++) {
            if (arrayDePelis[i].tags[k].match(expresion)) {
                arrWithTags.push(arrayDePelis[i]);
            }
        }
    }
    return arrWithTags;
};

const noFormat = (propiedad, arrayDePelis) => {
    propiedad["no-format"] = 1;
    if (propiedad["no-format"] == 1) {
        return JSON.stringify(arrayDePelis);
    } else {
        console.log("Error");
    }
};

exports.searchByCriteria = (criterios) => {
    let resultado = getAll();
      if (criterios.search) {
        resultado = searchByName(criterios, resultado);
      }
      if (criterios.tag) {
        resultado = searchByTag(criterios, resultado);
      }
      
      if (criterios.sort) {
        resultado = sortBy(criterios, resultado);
      }
      if (criterios.hasOwnProperty('no-format')){ 
        resultado = noFormat(criterios, resultado);
      }
  
    return resultado;
  };