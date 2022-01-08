//admin dashboard page
const formAct = document.querySelector(".prof-article");
const editProf = document.getElementById("edit-prof");
const profInp = document.querySelectorAll(".admin-user");
console.log(editProf);
console.log(formAct);
editProf.addEventListener("click", (res) => {
  console.log(editProf);
  if (editProf.type == "button") {
    profInp.forEach((x) => {
      x.disabled = false;
      x.style.color = "#ff9f1c";
      editProf.value = "submit";
      editProf.type = "submit";
    });
  } else {
    x.disabled = true;
    x.style.color = "#ff9f1c";
    editProf.value = "edit";
    editProf.type = "button";
  }
});
