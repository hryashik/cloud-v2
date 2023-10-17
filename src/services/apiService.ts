import axios from "axios";

class ApiService {
   constructor(private url: string) {}

   async signup(data: { username: string; password: string; email: string }) {
      try {
         const response = await axios.post(`${this.url}/auth`, data, {
            headers: {
               "Content-Type": "application/json",
            },
         });
         return response;
      } catch (error) {
         console.log(error);
      }
   }
}

const apiService = new ApiService(import.meta.env.BASE_URL);
export default apiService;