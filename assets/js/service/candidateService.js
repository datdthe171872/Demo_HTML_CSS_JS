import CANDIDATE_DATA from "../data/candidate-data.js";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageFns.js";

//lưu vào localstorage();
let candidateList = loadFromLocalStorage("candidate-list");
if (!candidateList) {
  saveToLocalStorage("candidate-list", CANDIDATE_DATA);
}
// getall
export function getAllCadidate() {
  return candidateList;
}
// get candidate byid
export function getCandidateById(id) {
  return candidateList.find((c) => c.id === id);
}
// create candidate
export function createCandidate(candidate) {
  candidate.id = Date.now();
  candidateList.unshift(candidate);
  saveToLocalStorage("candidate-list", candidateList);
}
// updatecandidate
export function updateCandidate(id, newData) {
  const index = candidateList.findIndex((c) => c.id === id);
  if (index !== -1) {
    candidateList[index] = {
      ...candidateList[index],
      ...newData,
    };
  }
  saveToLocalStorage("candidate-list", candidateList);
}
// removecandidatebyId
export function removeCandidate(id) {
  candidateList = candidateList.filter((c) => c.id !== id);
  saveToLocalStorage("candidate-list", candidateList);
}
