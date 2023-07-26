emailDiv = document.querySelector(".pre-contact__section:nth-of-type(2)");

emailDiv.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".contact__email-form").style.backgroundColor =
    "rgba(255,0,0, 0.25)";
  setTimeout(() => {
    document.querySelector(".contact__email-form").style.backgroundColor =
      "white";
  }, 100);
});
