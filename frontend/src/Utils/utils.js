import axios from "axios";
// import { isAfter, isSameDay, formatDate, parseISO, subDays } from 'date-fns';

/* Split string by 'T' */
export function displayTimeAsString(str) {
  return str.split("T")[0];
}

/* Returns sheet with sheetName from sheetPages */
export function findSheetByPages(safeSheetName, sheetPages) {
  for (const key in sheetPages) {
    if (!sheetPages.hasOwnProperty(key))
      continue;
    const page = sheetPages[key];
    const result = page.find(
      sheet => sheet.safe_sheet_name === safeSheetName,
    );

    if (result !== undefined)
      return result;
  }
}

/* Returns sheet with sheetName from sheets */
export function findSheetBySheets(safeSheetName, sheets) {
  return sheets.find(sheet => sheet.safe_sheet_name === safeSheetName);
}

/* Returns composer with composerName from composerPages */
export function findComposerByPages(safeComposerName, composerPages) {
  for (const key in composerPages) {
    if (!composerPages.hasOwnProperty(key))
      continue;
    const page = composerPages[key];
    const result = page.find(
      composer => composer.safe_name === safeComposerName,
    );

    if (result !== undefined)
      return result;
  }
}

/* Returns composer with composerName from composers */
export function findComposerByComposers(safeComposerName, composers) {
  return composers.find(composer => composer.safe_name === safeComposerName);
}

export function getCompImgUrl(portraitURL) {
  return portraitURL.includes("http")
    ? portraitURL
    : axios.defaults.baseURL + portraitURL;
}
