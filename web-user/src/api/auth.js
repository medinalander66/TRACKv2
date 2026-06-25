import { getJSON } from "./client";

export function login(credentials) {
  return Promise.resolve({ ok: true, user: { username: credentials.username } });
}

export function register(payload) {
  return Promise.resolve({ ok: true });
}