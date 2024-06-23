import axios from "axios";

class DatabaseService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async backupDatabase(): Promise<string> {
    try {
      const response = await axios.get(`${this.apiUrl}/api/Database/backup`);
      return response.data;
    } catch (error) {
      console.error("Error during database backup:", error);
      throw new Error("Error during database backup");
    }
  }

  async importDatabase(): Promise<string> {
    try {
      const response = await axios.get(`${this.apiUrl}/api/Database/import`);
      return response.data;
    } catch (error) {
      console.error("Error during database import:", error);
      throw new Error("Error during database import");
    }
  }
}

export default DatabaseService;
