export const idb =
  window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;

const createCollectionsInIndexDB = () => {
  if (!idb) {
    console.log('Браузер не підтримує IndexedDB');
    return;
  }
  const request = idb.open('test-task', 1);

  request.onerror = (err) => console.log(`Error: ${err}`);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains('taskData')) {
      db.createObjectStore('taskData', { keyPath: 'id' });
    }
  };
  request.onsuccess = () => console.log('База даних успішно відкрита');
};

export default createCollectionsInIndexDB