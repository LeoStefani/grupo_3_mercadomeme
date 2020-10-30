const axios = require('axios');
const  {defaultsProvincias}  = require('./defaults');

const url = "/"

let provinciasResources = {
    getProvincias: function () {
        return axios({
            ...defaultsProvincias,
            method: "GET",
            url: url + "provincias"         
        });
    }
};

module.exports = provinciasResources;

