import { Injectable } from '@angular/core';
import { CryptoService } from '../crypto-service/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private cryptoService: CryptoService) {}

  saveInLocalStorage(key: string, value: string) {
    const cryptoData = this.cryptoService.getCryptoString(value);
    localStorage.setItem(key, cryptoData);
  }

  getFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    if (data) {
      return this.cryptoService.getDecryptedString(data);
    }
    return new Error(`Key - ${key} - is not founded`);
  }

  remoteFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
