// lấy 2 chữ cái
function getInitials(fullName = "") {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 0) return "";

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];

  return (first + last).toUpperCase();
}

// hàm sinh màu
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#3F51B5",
    "#2196F3",
    "#009688",
    "#4CAF50",
    "#FF9800",
    "#795548",
  ];

  return colors[Math.abs(hash) % colors.length];
}
// hàm sinh avatar
export function generateAvatar(fullName) {
  const initials = getInitials(fullName);
  const bgColor = stringToColor(fullName);

  return `
    <div 
      class="avatar text-avatar display-flex align-items-center justify-content-center" 
      style="background:${bgColor}">
      ${initials}
    </div>
  `;
}
export function previewImg() {
  const input = document.getElementById("uploadImage");
  const preview = document.querySelector(".preview-img");
  const text = document.querySelector(".upload-text");
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
      text.style.display = "none";
    };
    reader.readAsDataURL(file);
  });
}
export function getValue(id) {
  return document.getElementById(id)?.value?.trim() || "";
}
export function setValue(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== "_ _" && value !== "--") {
    el.value = value;
    el.dispatchEvent(new Event("change")); // để select ăn màu
    console.log("id=", id, "value=", value);
  }
}

//mở modal
export function openModal(id) {
  document.getElementById(id).style.opacity = 1;
  document.getElementById(id).style.pointerEvents = "auto";
}
export function closeModal(id) {
  document.getElementById(id).style.opacity = 0;
  document.getElementById(id).style.pointerEvents = "none";
}
export function bindDateNow(id) {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById(id).value = today;
}
