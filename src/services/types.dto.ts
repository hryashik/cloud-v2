export type SignupDto = {
   email: string;
   password: string;
   username: string;
};
export type LoginDto = {
   email: string;
   password: string;
};
export type createDirDto = {
   name: string;
   path?: string
}