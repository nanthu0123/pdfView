// initialize and load the PDF
const url = '../pdf/test.pdf'


let pdfDoc,
    totalpages,
    pageNum = 1;

const scale = 0.5;




pdfjsLib.getDocument(url).promise.then(function (pdf_doc) {

    pdfDoc = pdf_doc;
    totalpages = pdfDoc.numPages;
    renderPage(pageNum, totalpages);

})

// Render the page
function renderPage(num, lastpage) {
    for (num; num <= lastpage; num++) {

        // create number of canvas
        let canvas_element = document.createElement('canvas'),
            parent_element = document.querySelector('#main')

        // append canvas element
        canvas_element.id = 'canvas' + num
        parent_element.appendChild(canvas_element)

        // create canvas context
        let canvas = document.querySelector('#canvas' + num),
            ctx = canvas.getContext('2d');

        // Get page
        pdfDoc.getPage(num).then(page => {

            // Set scale
            const viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            page.render({
                canvasContext: ctx,
                viewport
            })

        });

    }

};



