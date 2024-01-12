let validate = false;

const socket = io();

const chatBox = document.querySelector("#chatBox");
const chatUser = document.querySelector("#chatUser");
const checkUser = document.querySelector("#checkUser");
const messageLogs = document.querySelector("#messageLogs");
const clearMessages = document.querySelector("#clearMessages");

chatBox.addEventListener("keyup", (e) => {
  if (!validate) {
    validateUser();
  }
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: chatUser.value, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

chatBox.addEventListener("load", () => {
  socket.emit("init", "dato");
});

socket.on("messageLogs", (data) => {
  let messageLog = "";
  data.forEach((elm) => {
    messageLog += `
      <div class="log">
        <p class="user">${elm.user}</p>
        <p class="text">${elm.message}</p>
        <p class="date">${new Date(elm.atCreated).toLocaleString()}</p>
      </div>
    `;
  });
  messageLogs.innerHTML = messageLog;
});

chatUser.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (validator.isEmail(chatUser.value)) {
      changeValidate(true);
    } else {
      changeValidate(false);
    }
  } else {
    changeValidate(false);
  }
});

function validateUser() {
  Swal.fire({
    title: "Ingrese su email",
    input: "email",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!validator.isEmail(value)) {
        return "Por favor, ingrese su email para continuar.";
      }
    },
  }).then((result) => {
    changeValidate(true);
    chatUser.value = result.value;
  });
}

function changeValidate(check) {
  if (check) {
    validate = true;
    checkUser.classList.remove("visibleOff");
  } else {
    validate = false;
    checkUser.classList.add("visibleOff");
  }
}

clearMessages.addEventListener("click", () => {
  messageLogs.innerHTML = "";
  socket.emit("clean", "data");
});
