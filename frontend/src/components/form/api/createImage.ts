import { axiosInstance } from "../../../utils/axiosInstance";

export const createImage = async (files: FileList) => {
  const formData = new FormData();

  for (const file of files) {
    formData.append("files", file);
  }

  return await axiosInstance.post("/images", formData, {
    headers: {
      "Content-Type": files[0].type
    }
  }).then(({ data }) => data);
};