import axios from "@/config/axios";

export const UploadImageService = (route: string, data: any, token: string) => {
  return {
    call: axios.post(`${route}`, data),
  };
};

export const UpdateUploadImageService = (
  route: string,
  data: any,
  token: string
) => {
  return {
    call: axios.patch(`${route}`, data),
  };
};
