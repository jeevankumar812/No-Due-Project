const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = function generateCertificate(name, usn) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const filePath = path.join("uploads", `${usn}_certificate.pdf`);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // ✅ Border
    doc
      .lineWidth(3)
      .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
      .stroke("#000080");

    // ✅ College Logo (optional)
    const logoPath = path.join(__dirname, "logo.png"); // place logo.png in same folder
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, doc.page.width / 2 - 40, 50, { width: 80 });
    }

    // ✅ Title
    doc
      .fontSize(30)
      .fillColor("#000080")
      .text("NO DUE CERTIFICATE", {
        align: "center",
        underline: true,
      });

    doc.moveDown(2);

    // ✅ Student Info
    doc
      .fontSize(16)
      .fillColor("black")
      .text(`This is to certify that the following student has successfully cleared all academic dues:`, {
        align: "center",
      });

    doc.moveDown(1.5);

    doc
      .fontSize(18)
      .fillColor("black")
      .text(`Name: ${name}`, { align: "center" })
      .moveDown(0.5)
      .text(`USN: ${usn}`, { align: "center" });

    doc.moveDown(2);

    // ✅ Table Heading
    doc
      .fontSize(16)
      .fillColor("#000080")
      .text("Subjects Cleared", {
        align: "center",
        underline: true,
      });

    doc.moveDown(1);

    // ✅ Table Formatting
    const tableTop = doc.y;
    const subjects = [
      "Operating Systems",
      "Database Management System",
      "Computer Networks",
      "Cloud Computing",
      "Machine Learning",
      "Advanced Java",
    ];

    const startX = 120; // left margin
    const col1Width = 60;
    const col2Width = 320;
    const rowHeight = 30;

    // ✅ Table Header
    doc
      .lineWidth(1)
      .rect(startX, tableTop, col1Width + col2Width, rowHeight)
      .stroke()
      .fontSize(14)
      .fillColor("black")
      .text("No.", startX + 20, tableTop + 8)
      .text("Subject Name", startX + col1Width + 20, tableTop + 8);

    // ✅ Table Rows
    subjects.forEach((sub, i) => {
      const y = tableTop + (i + 1) * rowHeight;

      // Border
      doc
        .rect(startX, y, col1Width, rowHeight)
        .stroke()
        .rect(startX + col1Width, y, col2Width, rowHeight)
        .stroke();

      // Text
      doc
        .fontSize(12)
        .text(i + 1, startX + 25, y + 8)
        .text(sub, startX + col1Width + 10, y + 8);
    });

    doc.moveDown(6);

    // ✅ Footer (Date & Signature)
    const today = new Date().toLocaleDateString();
    doc
      .fontSize(12)
      .fillColor("black")
      .text(`Date: ${today}`, 70, 700)
      .text("Authorized Signature", 400, 700);

    doc.end();

    stream.on("finish", () => resolve(filePath));
  });
};
