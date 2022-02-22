document.querySelector(".frame").addEventListener("mousemove", (e) => {
  document.querySelector(".frame").classList.add("hover");
  document.querySelector(".blur").style.height = e.offsetY + "px";
  document.querySelector(".bg-color").style.height = e.offsetY + "px";
});

document.querySelector(".frame").addEventListener("mouseleave", (e) => {
  document.querySelector(".frame").classList.remove("hover");

  document.querySelector(".blur").style.height = "50%";
  document.querySelector(".bg-color").style.height = "50%";
});
