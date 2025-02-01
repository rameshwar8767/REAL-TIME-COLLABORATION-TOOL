// USER_CONNECTION_STATUS object to mimic an enum
export const USER_CONNECTION_STATUS = {
    OFFLINE: "offline",
    ONLINE: "online",
  };
  
  // User constructor function
  export class User {
    constructor(username, roomId, status, cursorPosition, typing, currentFile, socketId) {
      this.username = username;
      this.roomId = roomId;
      this.status = status;
      this.cursorPosition = cursorPosition;
      this.typing = typing;
      this.currentFile = currentFile;
      this.socketId = socketId;
    }
  }