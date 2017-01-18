var socket = io.connect();




function socketLogin(id){
    socket.emit("login", id);
};


function socketFav(id){
 socket.emit("addFav", id);
};

socket.on("NewLoanuser", function () {
    alert("Eén van jouw abonnementen is verhuurd!");
});

socket.on("loanAddedTeam", function () {
    alert("Er is een abonnement voor een wedstrijd van jouw favoriete ploeg beschikbaar!");


})