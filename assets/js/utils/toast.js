export function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerText = message;

  document.body.appendChild(toast);
  console.log("đã vào");
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
