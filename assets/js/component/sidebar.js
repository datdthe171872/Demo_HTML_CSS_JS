// rút gọn sidebar
export function shortenSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const shortenBtn = document.querySelector(".sb-shortenbtn");

  shortenBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-collapsed");

    const isCollapsed = sidebar.classList.contains("sidebar-collapsed");
    if (isCollapsed) {
      shortenBtn.innerHTML = `
        <div class="icon sidebar-icon icon-sb-arrowleft"></div>
    `;
    } else {
      shortenBtn.innerHTML = `
        <div class="icon sidebar-icon icon-sb-arrowleft"></div>
        Thu gọn
    `;
    }
  });
}
