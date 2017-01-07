(function (updater){
    var socketio = require("socket.io");
    updater.init = function(server) {
        var io = socketio.listen(server);
        io.sockets.on("connection", function(socket){
            console.log("socket connection");
           socket.on("login", function(id){
                console.log("user " + id + " has loged in.");
                socket.join(id);
            });

            socket.on("loanCreated", function(userid){
                console.log("loan afgerekend " + userid);
                socket.broadcast.to(userid).emit("NewLoanuser");
            });

            socket.on("addFav",function(data){
               
                var count = Object.keys(data).length;
                for(var i = 0; i<count; i++){
                    socket.join(data[i]["_id"]);
                    console.log("fav team toegevoegd" + data[i]["_id"]);
                }
            });

            socket.on("offerAdded", function(teamA, teamB){
                console.log("offer added " + teamA + " - " + teamB)

                socket.broadcast.to(teamA).emit("loanAddedTeam");
                socket.broadcast.to(teamB).emit("loanAddedTeam");
            })
        });
    };
})(module.exports);