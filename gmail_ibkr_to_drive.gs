/**
 * Gmail → Google Drive: Auto-copy IBKR PortfolioAnalyst report every day at 8am
 * =================================================================================
 * What this does:
 *   IBKR (donotreply@interactivebrokers.com) emails a "PortfolioAnalyst Report"
 *   PDF to paul11ipad@gmail.com every day. This script finds that day's email
 *   and saves the attached PDF straight into Paul's "IBKR" Google Drive folder
 *   — no manual download/upload needed, even from a phone.
 *
 * Setup (one-time, in Google Apps Script — script.google.com):
 *   1. New project, paste this whole file in as Code.gs.
 *   2. Extensions > Apps Script > Project Settings > set time zone to Asia/Singapore.
 *   3. Run > run "copyIBKRReportToDrive" once manually to authorize Gmail + Drive access.
 *   4. Triggers (clock icon, left sidebar) > Add Trigger:
 *        - Function: copyIBKRReportToDrive
 *        - Event source: Time-driven
 *        - Type: Day timer
 *        - Time of day: 8am to 9am
 *        (Apps Script day-timer triggers fire once somewhere in that hour window,
 *        not at the exact minute — that's a Google limitation, not a bug here.)
 *
 * Folder ID below is Paul's existing "IBKR" Drive folder (already used by the
 * manual "check the IBKR folder in Drive" workflow) — owner paul11ipad@gmail.com.
 */

var IBKR_DRIVE_FOLDER_ID = '1csY623IELGv_1UWFlAPAOpkaBPGEFBb2';

function copyIBKRReportToDrive() {
  var folder = DriveApp.getFolderById(IBKR_DRIVE_FOLDER_ID);
  var threads = GmailApp.search(
    'from:donotreply@interactivebrokers.com subject:"PortfolioAnalyst Report" has:attachment newer_than:2d'
  );

  var savedCount = 0;

  threads.forEach(function (thread) {
    thread.getMessages().forEach(function (message) {
      message.getAttachments().forEach(function (attachment) {
        var fileName = attachment.getName();
        var existing = folder.getFilesByName(fileName);

        if (existing.hasNext()) {
          Logger.log('Already in Drive, skipped: ' + fileName);
          return;
        }

        folder.createFile(attachment);
        savedCount++;
        Logger.log('Saved to Drive: ' + fileName);
      });
    });
  });

  Logger.log('Done. New files saved: ' + savedCount);
}
