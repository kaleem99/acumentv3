import React, { useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfViewerWithPdfjs = ({ file }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPdf = async () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const pdf = await pdfjsLib.getDocument(file).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    };

    if (file) {
      renderPdf();
    }
  }, [file]);

  return <canvas ref={canvasRef}></canvas>;
};

export default PdfViewerWithPdfjs;
