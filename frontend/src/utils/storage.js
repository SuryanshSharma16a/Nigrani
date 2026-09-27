// File: src/utils/storage.js

const MEMORY_FALLBACK_STORAGE = {};

/**
 * Storage wrapper supporting standard browser localStorage, custom async bridges, and in-memory fallbacks
 */
export const storage = {
  /**
   * Retrieves an item from storage and parses JSON safely
   */
  get(key, defaultValue = null) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        if (item === null || item === undefined) return defaultValue;
        return JSON.parse(item);
      }
      return MEMORY_FALLBACK_STORAGE[key] !== undefined ? MEMORY_FALLBACK_STORAGE[key] : defaultValue;
    } catch (err) {
      console.warn(`[Nigrani Storage] Error reading key "${key}":`, err);
      return defaultValue;
    }
  },

  /**
   * Serializes value to JSON and persists in storage
   */
  set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, serialized);
      }
      MEMORY_FALLBACK_STORAGE[key] = value;
      return true;
    } catch (err) {
      console.error(`[Nigrani Storage] Error setting key "${key}":`, err);
      return false;
    }
  },

  /**
   * Removes item from storage
   */
  remove(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
      delete MEMORY_FALLBACK_STORAGE[key];
      return true;
    } catch (err) {
      console.error(`[Nigrani Storage] Error removing key "${key}":`, err);
      return false;
    }
  },

  /**
   * Clears storage completely
   */
  clear() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
      Object.keys(MEMORY_FALLBACK_STORAGE).forEach((k) => delete MEMORY_FALLBACK_STORAGE[k]);
      return true;
    } catch (err) {
      console.error(`[Nigrani Storage] Error clearing storage:`, err);
      return false;
    }
  },
};

export default storage;
