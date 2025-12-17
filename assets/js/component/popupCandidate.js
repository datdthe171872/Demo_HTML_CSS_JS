import {
  createCandidate,
  updateCandidate,
  getCandidateById,
} from "../service/candidateService.js";
import { checkEmpty } from "../utils/validate.js";
import { render } from "./tableData.js";
import {
  getValue,
  setValue,
  openModal,
  closeModal,
  bindDateNow,
} from "../utils/commonFns.js";

let editingCandidateId = null;
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
  if (checkEmpty(candidate.fullName)) {
    alert("Vui lòng nhập họ tên");
    return;
  }
  createCandidate(candidate);

  alert("Thêm ứng viên thành công !");
  closeModal("Addcandidate");
}

// bắt sự kiện click button save
export function handleSave() {
  document.getElementById("save").addEventListener("click", (e) => {
    if (editingCandidateId) {
      editCandidate(editingCandidateId);
    } else {
      addCandidate();
    }
    render();
  });
}
//resetform
function resetForm() {
  editingCandidateId = null;
  document.querySelector(".modal-title").innerText = "Thêm ứng viên";
  Array.from(document.getElementsByClassName("modal-input")).forEach(
    (el) => (el.value = "")
  );
}
// bắt sự kiện click icon chỉnh sửa
export function clickEditIcon() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-icon")) {
      const row = e.target.closest("tr");
      const candidateId = Number(row.dataset.id);
      openEditCandidate(candidateId);
    }
  });
}

//binding data
function openEditCandidate(id) {
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

  openModal("Addcandidate");
}

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
  if (checkEmpty(candidate.fullName)) {
    alert("Vui lòng nhập họ tên");
    return;
  }
  updateCandidate(id, candidate);

  alert("Cập nhật ứng viên thành công !");
  resetForm();
  closeModal("Addcandidate");
}
// bắt event close
export function handleCancel() {
  let close = document
    .getElementById("close")
    .addEventListener("click", (e) => {
      closeModal("Addcandidate");
      resetForm();
    });
  let cancel = document
    .getElementById("cancel")
    .addEventListener("click", (e) => {
      closeModal("Addcandidate");
      resetForm();
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
