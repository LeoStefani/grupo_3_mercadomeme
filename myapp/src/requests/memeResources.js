const axios = require('axios');
const { defaultsMemes } = require('./defaults');

const url = "/"

let memeResources = {

    trending: function () {
        
        return axios({
            ...defaultsMemes,
            method: "GET",
            url: url + "get_memes"         
        })

    }

};

module.exports = memeResources;

