import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MnemonicRepository {
  setMnemonic(mnemonic: string): Promise<void>;
  getMnemonic(): Promise<string | null>;
  deleteMnemonic(): Promise<void>;
}

export class AsyncStorageMnemonicRepository implements MnemonicRepository {
  private static readonly mnemonicKey: string = 'mnemonic';

  async setMnemonic(mnemonic: string): Promise<void> {
    try {
      await AsyncStorage.setItem(
        AsyncStorageMnemonicRepository.mnemonicKey,
        mnemonic,
      );
    } catch (error) {
      console.error('Error saving mnemonic:', error);
    }
  }

  async getMnemonic(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(
        AsyncStorageMnemonicRepository.mnemonicKey,
      );
    } catch (error) {
      console.error('Error retrieving mnemonic:', error);
      return null;
    }
  }

  async deleteMnemonic(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AsyncStorageMnemonicRepository.mnemonicKey);
    } catch (error) {
      console.error('Error deleting mnemonic:', error);
    }
  }
}
