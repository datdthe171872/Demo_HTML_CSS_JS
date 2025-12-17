import initTableData from "./component/tableData.js";
import { shortenSidebar } from "./component/sidebar.js";
import { previewImg } from "./utils/commonFns.js";
import {
  handleSave,
  handleCancel,
  handleOpen,
  clickEditIcon,
} from "./component/popupCandidate.js";
import { handleDropdownSelect } from "./component/selectdropdown.js";
document.addEventListener("DOMContentLoaded", () => {
  initTableData();
  shortenSidebar();
  previewImg();
  handleSave();
  handleCancel();
  handleOpen();
  clickEditIcon();
  handleDropdownSelect();
});
