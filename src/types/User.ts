export interface User {
  id: string;
  name: string;
  role: string;
  location?: string; // Made optional if it's not always returned from DB
  token: string;
  avatar?: string;   // 🚀 ADD THIS PROPERTY HERE AS OPTIONAL STRING NODE
}