import initCandidatePage from "./page/candidatePage.js";
import { shortenSidebar } from "./component/sidebar.js";
import { previewImg } from "./utils/commonFns.js";
import {
  clickEditIcon,
  handleOpen,
  handleSaveCandidate,
  handleCancel,
} from "./page/candidatePage.js";
import { handleDropdownSelect } from "./component/selectdropdown.js";
document.addEventListener("DOMContentLoaded", () => {
  initCandidatePage();
  shortenSidebar();
  previewImg();
  handleSaveCandidate();
  handleCancel();
  handleOpen();
  clickEditIcon();
  handleDropdownSelect();
});
