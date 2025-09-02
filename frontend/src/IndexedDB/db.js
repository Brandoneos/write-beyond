// import { openDB } from "idb";

// export const initDB = async () => {
//   return openDB("myAppDB", 2, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains("files")) {
//         db.createObjectStore("files", { keyPath: "id", autoIncrement: true });
//       }
//     },
//   });
// };