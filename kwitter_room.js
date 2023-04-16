
//AÑADE TUS ENLACES DE FIREBASE
var firebaseConfig = {
      apiKey: "AIzaSyBB9QFZ4_5-e7MIGs1-gMOwokZlwBuL5fE",
      authDomain: "kwitter-f5610.firebaseapp.com",
      databaseURL: "https://kwitter-f5610-default-rtdb.firebaseio.com",
      projectId: "kwitter-f5610",
      storageBucket: "kwitter-f5610.appspot.com",
      messagingSenderId: "408194214967",
      appId: "1:408194214967:web:037ef3b00599976951a3b2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Inicio del código
                  console.log("Room Name - " + Room_names);
                  row = "<div class= 'room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //Final del código
            });
      });
}
getData();

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({ purpose: "Agregando Sala" });
      localStorage.setItem("room_name", room_name);
      window.location.replace("kwitter_page.html")
}

function redirectToRoomName(Room_names) { 
      console.log(Room_names); 
      localStorage.setItem("room_name", Room_names); 
      window.location = "kwitter_page.html"; 
} 
//agregar 
function logout() {
      localStorage.removeItem("user_name"); 
      localStorage.removeItem("room_name"); 
      window.location.replace("index.html"); 
}
