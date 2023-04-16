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


user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

document.getElementById("name_room").innerHTML = room_name;

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });


      document.getElementById("msg").value = "";
}

function regresar() {
      window.location.replace("kwitter_room.html");
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey; message_data = childData;
                        //Inicia código termianr la fnción Get Data
                        console.log(firebase_message_id);
                        console.log(message_data);
                        //cambio name
                        nombre = message_data['name'];

                        message = message_data['message'];

                        like = message_data['like'];

                        name_with_tag = "<h4> " + nombre + "<img class='user_tick' src='tick.png'></h4>";

                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";

                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";

                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;

                        document.getElementById("output").innerHTML += row;


                        //Termina código
                  }
            });
      });
}
getData();

//Agrega la funcion Update Like
function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });

}

//Agrega la función logout

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}



