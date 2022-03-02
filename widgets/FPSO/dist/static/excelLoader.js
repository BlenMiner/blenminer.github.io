//import { read } from "xlsx";

self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.2/xlsx.min.js');

self.addEventListener("message", e => {
    const workbook = XLSX.read(e.data, { sheets: ["DATA"], sheetRows: 200 , cellFormula : false, cellHTML : false, cellText : false});
    let table = XLSX.utils.sheet_to_json(workbook.Sheets.DATA, { header:1, defval: "" });
    postMessage(table);
}, false);
