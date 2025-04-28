export default class ErrorResponse extends Error {
  constructor(message, statusCode) {
    console.log(`ErrorResponse created: ${message}, Status: ${statusCode}`); // Отладка
    super(message);
    this.statusCode = statusCode;
  }
}
