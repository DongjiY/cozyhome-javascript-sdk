import { Persistable } from "./Persistable";

export class SessionStorageManager implements Persistable<boolean> {
  constructor() {}

  public save(key: string, content: boolean): void {
    sessionStorage.setItem(key, JSON.stringify(content));
  }

  public retrieve(key: string): boolean | undefined {
    const storedValue = sessionStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : undefined;
  }

  public delete(key: string): boolean | undefined {
    const storedValue = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : undefined;
  }
}
