function filterFunction() {
    let input, filter, li, i;
    input = document.getElementById("pokesearch");
    filter = input.value.toLowerCase();
    div = document.getElementById("pokeDropdown");
    li = div.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

document.getElementById("pokelistContainer").addEventListener("click", event => {
    pokeSearch.value = '';
    let selectedId = event.target.getAttribute('value');
    //console.log(selectedId);
    setInput(selectedId);
});

function setInput(id) {
  pokeSearch.value = id;
}