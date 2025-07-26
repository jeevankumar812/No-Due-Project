const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = function generateCertificate(name, usn) {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const filePath = path.join("uploads", `${usn}_certificate.pdf`);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(26).text("No Due Certificate", { align: "center" });
    doc.moveDown();
    doc.fontSize(18).text(`This is to certify that ${name} (USN: ${usn})`);
    doc.text("has cleared all academic dues successfully.", { align: "center" });
    doc.end();

    stream.on("finish", () => resolve(filePath));
  });
};
