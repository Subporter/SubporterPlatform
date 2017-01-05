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
                for(var fav in data){
                    socket.join(fav);
                    console.log("fav team toegevoegd" + fav);
                }
            });

            socket.on("loanAdded", function(teamA, teamB){
                socket.broadcast.to(teamA).emit("loanAddedTeam");
                socket.broadcast.to(teamB).emit("loanAddedTeam");
            })
        });
    };
})(module.exports);