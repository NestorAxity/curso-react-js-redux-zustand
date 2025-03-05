export interface AuthResponse{
    message: string,
    status: number
}

export interface AuthState {
    user: string | null;
    isAuthenticated: boolean;
    expirationTime: number | null;
    checkAuth: () => Promise<{ isAuthenticated: boolean; user: string | null }>;
    login: (username: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<string>;
    refreshToken: () => Promise<AuthResponse>;
}

export interface RegState {
    isRegistred: boolean,
    regis: (username: string, password: string) => Promise<AuthResponse>,
    regisOut: () => void
}