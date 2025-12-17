import {
  getAllCadidate,
  createCandidate,
  getCandidateById,
  updateCandidate,
} from "../service/candidateService.js";
import { checkEmptyValue } from "../utils/validatator.js";
import {
  paginate,
  getTotalPages,
  getValue,
  setValue,
  bindDateNow,
  generateAvatar,
  closeModal,
  openModal,
  resetForm,
} from "../utils/commonFns.js";
import { showToast } from "../utils/toast.js";
// lấy dữ liệu
export default function initCandidatePage() {
  renderCandidate();
  handleSelect();
  handleArrow();
  catchEventSearch();
}
let editingCandidateId = null;
let currentPage = 1;
let pageSize = 10;

// render dữ liệu kêt hợp phân trang và search
function renderCandidate() {
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
//phân trang
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
      renderCandidate();
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
      renderCandidate();
    }
  });
  arrowright.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderCandidate();
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
//catch event search
function catchEventSearch() {
  document.querySelector("#search-input").addEventListener("input", (e) => {
    keyword = e.target.value.trim();
    currentPage = 1;
    renderCandidate();
  });
}
// bắt sự kiện click button save
export function handleSaveCandidate() {
  document.getElementById("save").addEventListener("click", (e) => {
    if (editingCandidateId) {
      editCandidate(editingCandidateId);
    } else {
      addCandidate();
    }
    renderCandidate();
  });
}
// add candidate
function addCandidate() {
  const candidate = {
    id: Date.now(),
    fullName: getValue("fullname") || "_ _",
    phoneNumber: getValue("phone") || "_ _",
    email: getValue("email") || "_ _",
    dateOfBirth: getValue("dob") || "_ _",
    gender: getValue("genre") || "_ _",
    location: getValue("space") || "_ _",
    address: getValue("address") || "_ _",
    applicationDate: getValue("applicationDate") || "_ _",
    source: getValue("source") || "_ _",
    recruiter: getValue("humanresource") || "_ _",
    collaborator: getValue("collaborator") || "_ _",
    position: getValue("jobPosition") || "_ _",
    campaign: getValue("campaign") || "_ _",
    status: getValue("status") || "_ _",
    education: getValue("education") || "_ _",
    school: getValue("school") || "_ _",
    major: getValue("major") || "_ _",
    graduationYear: getValue("graduationYear") || "_ _",
    graduationRank: getValue("graduationYear") || "_ _",
    workplace: getValue("workplace") || "_ _",
    workStartDate: getValue("workStartDate") || "_ _",
    workEndDate: getValue("workEndDate") || "_ _",
    jobPosition: getValue("jobPosition") || "_ _",
    jobDescription: getValue("jobDescription") || "_ _",
    recruitmentNews: getValue("recruitmentNews") || "_ _",
    recruitmentRound: getValue("recruitmentRound") || "_ _",
    rating: getValue("rating") || "_ _",
    department: getValue("department") || "_ _",
    matchPercent: getValue("matchPercent") || "_ _",
    referrer: getValue("referrer") || "_ _",
    receptionInfo: getValue("receptionInfo") || "_ _",
    talentPool: getValue("talentPool") || "_ _",
  };
  if (checkEmptyValue(candidate.fullName)) {
    showToast("Vui lòng nhập họ tên", "error");
    return;
  }
  createCandidate(candidate);

  showToast("Thêm ứng viên thành công !");
  closeModal("Addcandidate");
}
// bắt sự kiện click icon chỉnh sửa Candidate
export function clickEditIcon() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-icon")) {
      const row = e.target.closest("tr");
      const candidateId = Number(row.dataset.id);
      bindingCadidate(candidateId);
      openModal("Addcandidate");
    }
  });
}
//binding candidate to modal
function bindingCadidate(id) {
  const candidate = getCandidateById(id);
  if (!candidate) return;

  editingCandidateId = id;

  // Đổi tiêu đề
  document.querySelector(".modal-title").innerText = "Chỉnh sửa ứng viên";

  // Bind data
  setValue("fullname", candidate.fullName);
  setValue("dob", candidate.dateOfBirth);
  setValue("genre", candidate.gender);
  setValue("space", candidate.location);
  setValue("phone", candidate.phoneNumber);
  setValue("email", candidate.email);
  setValue("address", candidate.address);

  setValue("education", candidate.education);
  setValue("school", candidate.school);
  setValue("major", candidate.major);

  setValue("applicationDate", candidate.applicationDate);
  setValue("source", candidate.source);
  setValue("humanresource", candidate.recruiter);
  setValue("collaborator", candidate.collaborator);

  setValue("recentworkplace", candidate.recentWorkplace);
  setValue("workplace", candidate.workplace);
  setValue("workStartDate", candidate.workStartDate);
  setValue("workEndDate", candidate.workEndDate);
  setValue("jobPosition", candidate.jobPosition);
  setValue("jobDescription", candidate.jobDescription);
}
//edit candidate
function editCandidate(id) {
  const candidate = {
    fullName: getValue("fullname") || "_ _",
    phoneNumber: getValue("phone") || "_ _",
    email: getValue("email") || "_ _",
    dateOfBirth: getValue("dob") || "_ _",
    gender: getValue("genre") || "_ _",
    location: getValue("space") || "_ _",
    address: getValue("address") || "_ _",
    applicationDate: getValue("applicationDate") || "_ _",
    source: getValue("source") || "_ _",
    recruiter: getValue("humanresource") || "_ _",
    collaborator: getValue("collaborator") || "_ _",
    position: getValue("jobPosition") || "_ _",
    campaign: getValue("campaign") || "_ _",
    status: getValue("status") || "_ _",
    education: getValue("education") || "_ _",
    school: getValue("school") || "_ _",
    major: getValue("major") || "_ _",
    graduationYear: getValue("graduationYear") || "_ _",
    graduationRank: getValue("graduationYear") || "_ _",
    workplace: getValue("workplace") || "_ _",
    workStartDate: getValue("workStartDate") || "_ _",
    workEndDate: getValue("workEndDate") || "_ _",
    jobPosition: getValue("jobPosition") || "_ _",
    jobDescription: getValue("jobDescription") || "_ _",
    recruitmentNews: getValue("recruitmentNews") || "_ _",
    recruitmentRound: getValue("recruitmentRound") || "_ _",
    rating: getValue("rating") || "_ _",
    department: getValue("department") || "_ _",
    matchPercent: getValue("matchPercent") || "_ _",
    referrer: getValue("referrer") || "_ _",
    receptionInfo: getValue("receptionInfo") || "_ _",
    talentPool: getValue("talentPool") || "_ _",
  };
  if (checkEmptyValue(candidate.fullName)) {
    showToast("Vui lòng nhập họ tên", "error");
    return;
  }
  updateCandidate(id, candidate);

  showToast("Cập nhật ứng viên thành công !");
  editingCandidateId = null;
  resetForm("Thêm ứng viên");
  closeModal("Addcandidate");
}
// bắt event close
export function handleCancel() {
  let close = document
    .getElementById("close")
    .addEventListener("click", (e) => {
      editingCandidateId = null;
      resetForm("Thêm ứng viên");
      closeModal("Addcandidate");
    });
  let cancel = document
    .getElementById("cancel")
    .addEventListener("click", (e) => {
      editingCandidateId = null;
      closeModal("Addcandidate");
      resetForm("Thêm ứng viên");
    });
}
// bắt event open
export function handleOpen() {
  let open = document
    .getElementById("openbtn")
    .addEventListener("click", (e) => {
      bindDateNow("applicationDate");
      openModal("Addcandidate");
    });
}
