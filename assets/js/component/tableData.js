import { getAllCadidate } from "../service/candidateService.js";
import { generateAvatar } from "../utils/commonFns.js";
import { saveToLocalStorage } from "../utils/localStorageFns.js";
// lấy dữ liệu
export default function initCandidatePage() {
  render();
  handleSelect();
  handleArrow();
  catchEvent();
}
let currentPage = 1;
let pageSize = 10;
export function paginate(list, page = currentPage, size = pageSize) {
  const start = (page - 1) * size;
  return list.slice(start, start + size);
}
function getTotalPages(totalItems, size = pageSize) {
  return Math.ceil(totalItems / size);
}

// render dữ liệu
export function render() {
  const list = getAllCadidate();

  //search
  const searchedList = searchCandidates(list, keyword);
  // phân trang
  const pagedList = paginate(searchedList);

  // add to html
  const tableBody = document.querySelector("#data-candidate");
  tableBody.innerHTML = pagedList
    .map(
      (c) =>
        `
                                <tr class="data-row" data-id="${c.id}">
                                    <td class="field-items-first text-center"><input type="checkbox" /></td>
                                      <td class="field-items display-flex align-items-center">
                                          ${generateAvatar(c.fullName)}
                                          ${c.fullName}
                                      </td>
                                      <td class="field-items">${c.email}</td>
                                    <td class="field-items ">${
                                      c.phoneNumber
                                    }</td>
                                    <td class="field-items">${c.source}</td>
                                    <td class="field-items">${c.campaign}</td>
                                    <td class="field-items">${c.position}</td>
                                    <td class="field-items">${
                                      c.recruitmentNews
                                    }</td>
                                    <td class="field-items">${
                                      c.recruitmentRound
                                    }</td>
                                    <td class="field-items">${c.rating}</td>
                                    <td class="field-items">${
                                      c.applicationDate
                                    }</td>
                                    <td class="field-items">${c.education}</td>
                                    <td class="field-items">${c.school}</td>
                                    <td class="field-items">${c.major}</td>
                                    <td class="field-items">${c.workplace}</td>
                                    <td class="field-items">${c.recruiter}</td>
                                    <td class="field-items">${c.department}</td>
                                    <td class="field-items">${
                                      c.matchPercent !== "_ _" &&
                                      c.matchPercent !== "--"
                                        ? c.matchPercent + "%"
                                        : "__"
                                    }</td>
                                    <td class="field-items">${c.location}</td>
                                    <td class="field-items">${c.referrer}</td>
                                    <td class="field-items">${
                                      c.receptionInfo
                                    }</td>
                                    <td class="field-items">${c.talentPool}</td>
                                    <td class="action-col display-flex justify-content-space-around align-items-center">
                                        <span class="icon edit-icon"></span>
                                        <!-- <span class="icon-default delete-icon"></span> -->
                                    </td>
                                </tr>
    `
    )
    .join("");
  updatePaginationInfo(list.length);
}
// update dòng 1-25 bản ghi
function updatePaginationInfo(totalItems) {
  const info = document.querySelector(".pagination-item:nth-of-type(2)");

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  info.textContent = `${start} - ${end} bản ghi`;
  const total = document.querySelector("#total");
  total.innerHTML = `${totalItems}`;
}
// xử lý select pagination

function handleSelect() {
  document
    .querySelector("#pagination-select")
    .addEventListener("change", (e) => {
      pageSize = +e.target.value;
      currentPage = 1;
      render();
    });
}
//sử lý mũi tên
function handleArrow() {
  const list = getAllCadidate();
  const totalPages = getTotalPages(list.length);
  const arrowleft = document.querySelector(".icon-arrow-left");
  const arrowright = document.querySelector(".icon-arrow-right");
  arrowleft.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      render();
    }
  });
  arrowright.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      render();
    }
  });
}

//function searchCandidate
let keyword = "";
function searchCandidates(list, keyword) {
  if (!keyword) return list;

  const lower = keyword.toLowerCase();

  return list.filter(
    (c) =>
      c.fullName.toLowerCase().includes(lower) ||
      c.phoneNumber.includes(keyword)
  );
}
//catch event
function catchEvent() {
  document.querySelector("#search-input").addEventListener("input", (e) => {
    keyword = e.target.value.trim();
    currentPage = 1;
    render();
  });
}
