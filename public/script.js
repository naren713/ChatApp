// Make Connection

var socket = io.connect("http://localhost:3000");

// Query Dom

var message = document.getElementById("messageInput"),
  userName = document.getElementById("userName"),
  btn = document.getElementById("button-addon2"),
  output = document.getElementById("message-container");

// Emit Event

btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    userName: userName.value,
  });
});

// Listen for Events

socket.on("chat", (data) => {
  output.innerHTML +=
    "<p><strong>" + data.userName + ":</strong>" + data.message + "</p>";
  message.value = "";
});
