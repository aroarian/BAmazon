var request = require("request");
var showSearch = require("./show.js")
var actorSearch = require("./actor.js")
var command = process.argv[2];
var input = process.argv.splice(3);
var inputJoin = input.join("+");


if (command == "show"){
    
    showSearch.show(inputJoin)
};

if (command == "actor"){
    
   actorSearch.actor(inputJoin)
};



