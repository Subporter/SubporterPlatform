const socketio = require('socket.io');

let sockets = (() => {
    let init = (server) => {
        let io = socketio.listen(server);

        io.sockets.on('connection', (socket) => {
            console.log("Socket connected");

            socket.on('eventRoomClient', (data) =>{
                console.log("Socket connected for event ", data);
                socket.join(data);
            })

            socket.on("newLoanClient", (data) =>{
                console.log("socket got a new loan: " + data);
                socket.broadcast.to(data).emit("newLoanServer", data);
            });

        });
    };

    return {
        init: init
    };
})();

module.exports = sockets;