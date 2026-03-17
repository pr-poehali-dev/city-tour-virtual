import { PDF_STYLES } from "./pdfStyles";
import { renderIntroSlides, renderStopSlides, renderQrSlide, renderFinalSlide, QR_URL } from "./pdfSlides";

export function printPdf() {
  const win = window.open("", "_blank");
  if (!win) return;

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8"/>
  <title>Виртуальная экскурсия — Санкт-Петербург</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Cormorant+Garamond:wght@600;700&display=swap" rel="stylesheet">
  <style>${PDF_STYLES}</style>
</head>
<body>
${renderIntroSlides()}
${renderStopSlides()}
${renderQrSlide(QR_URL)}
${renderFinalSlide()}
<script>window.onload = function() { window.print(); }</script>
</body>
</html>`;

  win.document.write(html);
  win.document.close();
}
