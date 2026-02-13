import { Injectable } from '@angular/core';

export interface AuthResult {
  ok: boolean;
  message: string;
}

type UserRecord = {
  username: string;
  password: string; // demo simple (NO producción)
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private USERS_KEY = 'motr_users';
  private SESSION_KEY = 'motr_session';

  private readUsers(): UserRecord[] {
    try {
      const raw = localStorage.getItem(this.USERS_KEY);
      return raw ? (JSON.parse(raw) as UserRecord[]) : [];
    } catch {
      return [];
    }
  }

  private writeUsers(users: UserRecord[]) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.SESSION_KEY);
  }

  currentUser(): string | null {
    return localStorage.getItem(this.SESSION_KEY);
  }

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }

  async register(username: string, password: string): Promise<AuthResult> {
    username = (username ?? '').trim();
    password = (password ?? '').trim();

    if (!username || !password) {
      return { ok: false, message: 'Usuario y contraseña son obligatorios.' };
    }

    const users = this.readUsers();
    const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) {
      return { ok: false, message: 'Ese usuario ya existe. Usa otro.' };
    }

    users.push({ username, password });
    this.writeUsers(users);

    return { ok: true, message: 'Usuario creado. Ahora inicia sesión.' };
  }

  async login(username: string, password: string): Promise<AuthResult> {
    username = (username ?? '').trim();
    password = (password ?? '').trim();

    if (!username || !password) {
      return { ok: false, message: 'Usuario y contraseña son obligatorios.' };
    }

    const users = this.readUsers();
    const found = users.find(
      u =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (!found) {
      return { ok: false, message: 'Credenciales incorrectas o usuario no registrado.' };
    }

    // sesión
    localStorage.setItem(this.SESSION_KEY, found.username);

    return { ok: true, message: 'Bienvenido.' };
  }
}