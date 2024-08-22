const navItems = document.getElementsByClassName("navbar-item");
const txtNavItems = document.getElementsByClassName("txt-navbarItem");
const sideMoreBtn = document.getElementById("mobile-menuBtn");
const sideMenu = document.getElementById("side-menu");

// get input elements

const fistnameInp = document.getElementById("inp-firstname");
const lastNameInp = document.getElementById("inp-lastname");
const EmailIp = document.getElementById("inp-email");
const messageInp = document.getElementById("inp-msg");

const btnSend = document.getElementById("btn-sendMsg");
const form = document.getElementById("form");
const result = document.getElementById("result");

sideMoreBtn.addEventListener("click", () => {
  if (sideMenu.style.display === "flex") {
    sideMenu.style.display = "none";
  } else {
    sideMenu.style.display = "flex";
  }
});

let cursorDot = document.querySelector("[data-cursor-dot]");
let cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;
});

// validation
let validation = () => {
  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (nameRegex.test(fistnameInp.value)) {
    fistnameInp.style.border = "solid 1px grey";
  } else {
    fistnameInp.style.border = "solid 1px red";
    return false;
  }

  if (nameRegex.test(lastNameInp.value)) {
    lastNameInp.style.border = "solid 1px grey";
  } else {
    lastNameInp.style.border = "solid 1px red";
    return false;
  }

  if (emailRegex.test(EmailIp.value)) {
    EmailIp.style.border = "solid 1px grey";
  } else {
    EmailIp.style.border = "solid 1px red";
    return false;
  }
  if (emailRegex.test(EmailIp.value)) {
    EmailIp.style.border = "solid 1px grey";
  } else {
    EmailIp.style.border = "solid 1px red";
    return false;
  }

  if (messageInp.value.length != 0) {
    messageInp.style.border = "solid 1px grey";
  } else {
    messageInp.style.border = "solid 1px red";
    return false;
  }
  return true;
};

btnSend.addEventListener("click", (event) => {
  console.log(form);
  event.preventDefault();
  const val = validation();
  if (val) {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        console.log(response);
        if (response.status == 200) {
          result.innerHTML = "Form submitted successfully";
        } else {
          console.log(response);
          result.innerHTML = json.message;
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.innerText = "Send Message";
        }, 3000);
      });
  }
});

fistnameInp.addEventListener("input", validation);
lastNameInp.addEventListener("input", validation);
EmailIp.addEventListener("input", validation);
messageInp.addEventListener("input", validation);
