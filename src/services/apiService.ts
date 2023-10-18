import axios, { AxiosError } from "axios";
import { LoginDto, SignupDto } from "./types.dto";
import { UserInfoType } from "../types/user";
import { FileType } from "../types/file";

export class ApiError extends Error {
   statusCode: number;
   constructor(msg: string, statusCode: number) {
      super(msg);
      this.statusCode = statusCode;
   }
}

class ApiService {
   constructor(private url: string) {}

   async signup(signupData: SignupDto) {
      try {
         const response = await axios.post<{ token: string }>(
            `${this.url}/auth/signup`,
            signupData,
            {
               headers: {
                  "Content-Type": "application/json",
               },
            },
         );
         const data = response.data.token;
         return data;
      } catch (error) {
         if (error instanceof AxiosError) {
            const statusCode = error.response?.status as number;
            if (statusCode === 400)
               throw new ApiError(
                  "Data must contain email, username and password",
                  statusCode,
               );
            if (statusCode === 409)
               throw new ApiError("This credentials is taken", 409);
         }
         throw new Error("Some error");
      }
   }

   async login(loginData: LoginDto) {
      try {
         const { data } = await axios.post<{ token: string }>(
            `${this.url}/auth/login`,
            loginData,
            { headers: { "Content-Type": "application/json" } },
         );
         return data.token;
      } catch (e) {
         if (e instanceof AxiosError) {
            const statusCode = e.response?.status as number;
            throw new ApiError("Credentials is wrong", statusCode);
         }
         throw new Error();
      }
   }

   async getUserInfo() {
      try {
         const token = localStorage.getItem("auth-token");
         const { data } = await axios.get<UserInfoType>(
            `${this.url}/auth/user`,
            {
               headers: { Authorization: `Bearer ${token}` },
            },
         );
         return data;
      } catch (error) {
         if (error instanceof AxiosError) {
            const statusCode = error.response?.status as number;
            if (statusCode === 401) {
               throw new ApiError("Token is expired", 401);
            }
         }
         throw new Error();
      }
   }

   async getAllFiles() {
      try {
         const token = localStorage.getItem("auth-token");
         const { data } = await axios.get<FileType[]>(`${this.url}/files`, {
            headers: { Authorization: `Bearer ${token}` },
         });
         return data;
      } catch (error) {
         if (error instanceof AxiosError) {
            throw new ApiError("Files error", error.response?.status!!);
         }
         throw new Error();
      }
   }
}

const apiService = new ApiService(import.meta.env.VITE_BASE_URL);
export default apiService;
