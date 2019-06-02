document.addEventListener("DOMContentLoaded", function() {
  // nav menu
  const forms = document.querySelectorAll(".side-menu");
  M.Sidenav.init(forms, { edge: "left" });

  document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector("#card-quote").classList.remove("scale-out");
    document.querySelector("#card-content-quote").classList.toggle("scale-out");
  });
});
