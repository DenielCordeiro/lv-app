import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  get<T>(key: string, defaultValue: T): T {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
    } catch (error) {
      console.error("Error getting item from localStorage", error);

      return defaultValue;
    }
  }
}
