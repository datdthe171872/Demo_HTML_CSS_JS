// lưu vào localStorage
export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get từ localStorage
export function loadFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
