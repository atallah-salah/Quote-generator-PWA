document.addEventListener("DOMContentLoaded", function() {
  // nav menu
  const forms = document.querySelectorAll(".side-menu");
  M.Sidenav.init(forms, { edge: "left" });

  // var elems = document.querySelectorAll('.dropdown-trigger');
  // var instances = M.Dropdown.init(elems);

  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);

  document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector("#card-quote").classList.remove("scale-out");
    document.querySelector("#card-content-quote").classList.toggle("scale-out");
    renderQuote((...args)=>{
      console.log({...args});
    })
  });
});

