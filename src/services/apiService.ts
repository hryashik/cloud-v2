import axios from "axios";
import { SignupDto } from "./types.dto";



class ApiService {
   constructor(private url: string) {}

   async signup(data: SignupDto) {
      try {
         const response = await axios.post(`${this.url}/auth/signup`, data, {
            headers: {
               "Content-Type": "application/json",
            },
         });
         return response;
      } catch (error) {
         
      }
   }
}

const apiService = new ApiService(import.meta.env.VITE_BASE_URL);
export default apiService;