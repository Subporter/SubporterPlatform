const socketio = require('socket.io');

let sockets = (() => {
    let init = (server) => {
        let io = socketio.listen(server);

        io.sockets.on('connection', (socket) => {
            console.log("Socket connected");

            socket.on('login', (user) => {
                console.log("User with id " + user + " has logged in");
                socket.join(user);
            });

            socket.on('loanLentOut', (user) => {
                console.log("Loan of user with id " + user + " lent out");
                socket.broadcast.to(user).emit('loanLent');
            });

            socket.on('favoriteAdded', (data) => {
                for (let i = 0, l = Object.keys(data).length; i < l; i++) {
                    console.log("Team with id " + data[i]._id + " favorited");
                    socket.join(data[i]._id);
                }
            });

            socket.on('offerAdded', (team) => {
                console.log("Offer added for team with id " + team);
                socket.broadcast.to(team).emit('loanAddedTeam');
            });
        });
    };

    return {
        init: init
    };
})();

module.exports = sockets;