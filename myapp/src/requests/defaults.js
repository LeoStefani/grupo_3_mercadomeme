//Se definen distintos default y se hacen exports nombrados para importar en cada request.

const defaultsMemes = {
    baseURL: "https://api.imgflip.com",
    timeout: 4000
};

const defaultsProvincias = {
    baseURL: "https://apis.datos.gob.ar/georef/api",
    timeout: 4000
};

const defaultsCountries = {
    baseURL: "https://restcountries.eu/rest/v2",
    timeout: 4000
};

module.exports.defaultsMemes = defaultsMemes;
module.exports.defaultsProvincias = defaultsProvincias;
module.exports.defaultsCountries = defaultsCountries;