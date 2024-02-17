'use client';

import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import '../styles/Sample.css'
import OverlayText from './OverlayText';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 800;

function PdfViewer() {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>();
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [loadNum, setLoadNum] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }
    function customTextRenderer(): string{
        console.log("customTextRenderer")
        return "customTextRenderer customTextRenderer"
    }

    return (
        <div>
            <div className="Example">
                <header>
                    <h1>react-pdf page</h1>
                    <h3>{loadNum}</h3>
                </header>
                <div className="pdf-container">
                    <div className="pdf-container-document" ref={setContainerRef}>
                        <Document file="csir.pdf" onLoadSuccess={onDocumentLoadSuccess} options={options}>
                            {/* <Page width={maxWidth} pageNumber={pageNumber} /> */}
                            {Array.from(new Array(numPages), (el, index) => (
                                <div className='overlay-container' key={`page_${index + 1}`}>
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={maxWidth}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        customTextRenderer={customTextRenderer}
                                    />
                                    <OverlayText />
                                </div>
                            ))}
                        </Document>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PdfViewer;