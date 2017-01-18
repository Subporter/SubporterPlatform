var socket = io.connect();




function socketLogin(id){
    socket.emit("login", id);
};


function socketFav(id){
 socket.emit("addFav", id);
};

function socketOffer(id1, id2){
    socket.emit("offerAdded", id1, id2 );
};

function socketLoan(id){
    socket.emit("loanCreated", id);
};

socket.on("NewLoanuser", function () {
    alert("Eén van jouw abonnementen is verhuurd!");
});

socket.on("loanAddedTeam", function () {
    alert("Er is een abonnement voor een wedstrijd van jouw favoriete ploeg beschikbaar!");


})