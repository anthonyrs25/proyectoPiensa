import { Injectable } from '@angular/core';

type StoredUser = { username: string; passwordHash: string; createdAt: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'motr_users';
  private sessionKey = 'motr_session';

  async register(username: string, password: string): Promise<{ ok: boolean; message: string }> {
    username = username.trim().toLowerCase();
    if (!username || !password) return { ok: false, message: 'Usuario y contraseña son obligatorios.' };
    if (password.length < 6) return { ok: false, message: 'La contraseña debe tener al menos 6 caracteres.' };

    const users = this.getUsers();
    if (users.some(u => u.username === username)) {
      return { ok: false, message: 'Ese usuario ya existe.' };
    }

    const passwordHash = await this.sha256(password);
    users.push({ username, passwordHash, createdAt: new Date().toISOString() });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return { ok: true, message: 'Usuario creado. Ahora inicia sesión.' };
  }

  async login(username: string, password: string): Promise<{ ok: boolean; message: string }> {
    username = username.trim().toLowerCase();
    if (!username || !password) return { ok: false, message: 'Usuario y contraseña son obligatorios.' };

    const users = this.getUsers();
    const user = users.find(u => u.username === username);
    if (!user) return { ok: false, message: 'Usuario o contraseña incorrectos.' };

    const passwordHash = await this.sha256(password);
    if (passwordHash !== user.passwordHash) return { ok: false, message: 'Usuario o contraseña incorrectos.' };

    localStorage.setItem(this.sessionKey, JSON.stringify({ username, loginAt: new Date().toISOString() }));
    return { ok: true, message: 'Login correcto.' };
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.sessionKey);
  }

  getSession(): { username: string; loginAt: string } | null {
    const raw = localStorage.getItem(this.sessionKey);
    return raw ? JSON.parse(raw) : null;
  }

  private getUsers(): StoredUser[] {
    const raw = localStorage.getItem(this.usersKey);
    return raw ? JSON.parse(raw) : [];
  }

  private async sha256(text: string): Promise<string> {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
}