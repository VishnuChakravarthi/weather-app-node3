console.log("js from frontend");

const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

messageOne.textContent = "Loading...";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = input.value;

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((response) => {
      if (response.error) {
        messageOne.textContent = response.error;
        return;
      }
      messageOne.textContent = response.location;
      messageTwo.textContent = response.forecast;
    });
  });
});
