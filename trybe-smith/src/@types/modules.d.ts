declare namespace NodeJS {
  export interface ProcessEnv {
    MYSQL_HOST: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
  }
}

// declare namespace Express {
//   export interface Request {
//     user?: { 
//       id: number;
//       username: string;
//       iat: number;
//       exp: number;
//     }
//   }
// }