const axios = require('axios');
const  defaultsCountries  = require('./defaults');

const url = "/"

let countriesResources = {
    getCountries: function () {
        return axios({
            ...defaultsCountries,
            method: "GET",
            url: url + "all"         
        });
    }
};

module.exports = countriesResources;