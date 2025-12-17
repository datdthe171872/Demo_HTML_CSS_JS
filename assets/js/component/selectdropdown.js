export function handleDropdownSelect() {
  document.querySelectorAll(".custom-select").forEach((select) => {
    const selected = select.querySelector(".selected");
    const options = select.querySelector(".options");
    const name = select.dataset.name;
    const hiddenInput = document.querySelector(`input[id="${name}"]`);

    // mở dropdown
    selected.addEventListener("click", (e) => {
      e.stopPropagation(); // ⛔ ngăn document click
      options.classList.toggle("show");
    });
    // gán giá trị
    options.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        selected.textContent = e.target.textContent;
        hiddenInput.value = e.target.dataset.value;
        options.classList.remove("show");
      }
    });
  });
  //đóng dropdown khi ấn ra ngoài
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".options.show")
      .forEach((opt) => opt.classList.remove("show"));
  });
}
