// Code.gs

const SHEET_NAME = "Sheet1"; // 실제 시트 탭 이름으로 변경

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME);

    // 프론트/서버에서 온 JSON
    const data = JSON.parse(e.postData.contents);

    // 헤더가 없으면 생성 (원하시면 제거 가능)
    if (sh.getLastRow() === 0) {
      sh.appendRow([
        "createdAt",
        "tab",
        "name",
        "phone",
        "branches",
        "courses",
        "message",
      ]);
    }

    sh.appendRow([
      data.createdAt || new Date().toISOString(),
      data.tab || "",
      data.name || "",
      data.phone || "",
      (data.branchLabels || []).join(", "),
      (data.courseLabels || []).join(", "),
      data.message || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
