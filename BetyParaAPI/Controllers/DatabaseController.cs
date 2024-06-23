using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System;

namespace BetyParaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseController : ControllerBase
    {
        [HttpGet("backup")]
        public IActionResult BackupDatabase()
        {
            var backupPath = @"C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVERHAOUIR\MSSQL\Backup\Para.bak"; // Ensure this path is accessible and writable.
            var dbName = "Para";

            try
            {
                string sqlCommand = $"/C sqlcmd -S HAOURI\\MSSQLSERVERHAOUI -Q \"BACKUP DATABASE [{dbName}] TO DISK='{backupPath}' WITH NOFORMAT, NOINIT, NAME='{dbName}-Full Database Backup', SKIP, NOREWIND, NOUNLOAD, STATS=10\"";

                using (Process process = new Process())
                {
                    process.StartInfo.UseShellExecute = false;
                    process.StartInfo.RedirectStandardOutput = true;
                    process.StartInfo.RedirectStandardError = true;
                    process.StartInfo.FileName = "cmd.exe";
                    process.StartInfo.Arguments = sqlCommand;
                    process.StartInfo.CreateNoWindow = true;
                    process.Start();

                    string output = process.StandardOutput.ReadToEnd();
                    string errors = process.StandardError.ReadToEnd();
                    process.WaitForExit();

                    if (process.ExitCode == 0)
                    {
                        return Ok("Backup completed successfully.");
                    }
                    else
                    {
                        return StatusCode(500, $"Error during backup: {errors}");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        [HttpGet("import")]
        public IActionResult ImportDatabase()
        {
            var backupPath = @"C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVERHAOUIR\MSSQL\Backup\Para.bak"; // Path to the backup file.
            var dbName = "Para";

            try
            {
                string sqlCommand = $"/C sqlcmd -S HAOURI\\MSSQLSERVERHAOUI -Q \"RESTORE DATABASE [{dbName}] FROM DISK='{backupPath}' WITH REPLACE\"";

                using (Process process = new Process())
                {
                    process.StartInfo.UseShellExecute = false;
                    process.StartInfo.RedirectStandardOutput = true;
                    process.StartInfo.RedirectStandardError = true;
                    process.StartInfo.FileName = "cmd.exe";
                    process.StartInfo.Arguments = sqlCommand;
                    process.StartInfo.CreateNoWindow = true;
                    process.Start();

                    string output = process.StandardOutput.ReadToEnd();
                    string errors = process.StandardError.ReadToEnd();
                    process.WaitForExit();

                    if (process.ExitCode == 0)
                    {
                        return Ok("Database import completed successfully.");
                    }
                    else
                    {
                        return StatusCode(500, $"Error during database import: {errors}");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }
    }
}
