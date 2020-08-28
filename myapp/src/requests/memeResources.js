const axios = require('axios');
const defaults = require('./defaults');

const url = "/"

let memeResources = {

    trending: function () {
        
        return axios({
            ...defaults,
            method: "GET",
            url: url + "get_memes"         
        })

    }

};

module.exports = memeResources;

