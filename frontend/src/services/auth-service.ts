import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Define types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
}

export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
  roles?: string[];
}

// API URL - replace with your actual API URL
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(loginRequest: LoginRequest): Promise<AuthResponse> {
    const response = await axios.post(API_URL + "signin", loginRequest);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  async register(registerRequest: RegisterRequest): Promise<{ message: string }> {
    return axios.post(API_URL + "signup", registerRequest);
  }

  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isLoggedIn(): boolean {
    const user = this.getCurrentUser();
    if (!user) {
      return false;
    }

    const decodedToken = this.getDecodedToken();
    return decodedToken.exp * 1000 > Date.now();
  }

  getDecodedToken(): DecodedToken {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error("No user found");
    }
    return jwtDecode<DecodedToken>(user.token);
  }

  getAuthHeader(): { Authorization: string } | Record<string, never> {
    const user = this.getCurrentUser();
    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    } else {
      return {};
    }
  }

  async getUserProfile(): Promise<User> {
    const headers = this.getAuthHeader();
    const response = await axios.get("http://localhost:8080/api/users/me", {
      headers,
    });
    return response.data;
  }

  async updateUserProfile(updatedData: Partial<User>): Promise<User> {
    const headers = this.getAuthHeader();
    const response = await axios.put("http://localhost:8080/api/users/me", updatedData, {
      headers,
    });
    return response.data;
  }

}

export default new AuthService();