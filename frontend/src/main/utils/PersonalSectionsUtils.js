import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
  console.log(message);
  toast(message);
}

export function cellToAxiosParamsDelete({cell: cell, psId: psId}) {
    console.log("PS identifier " + psId);
  return {
    url: "/api/courses/user/psid",
    method: "DELETE",
    params: {
      enrollCd: cell.row.values["classSections[0].enrollCode"],
      psId: psId,
    },
  };
}
