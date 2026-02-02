const axios = require('axios');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const baseUrl = 'http://localhost:4000';

const endpoints = [
    // Admin GET
    { method: 'GET', url: '/admin/comments' },
    { method: 'GET', url: '/admin/general_settings' },
    { method: 'GET', url: '/admin/college_school' },
    { method: 'GET', url: '/admin/busdetails' },
    { method: 'GET', url: '/admin/transport-credentials' },
    { method: 'GET', url: '/admin/transportchoose' },
    { method: 'GET', url: '/admin/waiting_locations' },
    { method: 'GET', url: '/admin/notifications' },

    // Admin POST
    { method: 'POST', url: '/admin/login' },
    { method: 'POST', url: '/admin/add_stations' },
    { method: 'POST', url: '/admin/getstations' },
    { method: 'POST', url: '/admin/getstudents' },

    // Mobile POST
    { method: 'POST', url: '/mobile_api/v1/driver_login' },
    { method: 'POST', url: '/mobile_api/v1/parent_login' },

    // General GET
    { method: 'GET', url: '/api/v1/comments' },
    { method: 'GET', url: '/api/v1/login' },

    // Notification GET
    { method: 'GET', url: '/notification/get_all_fcm_tokens' }
];

async function generateReport() {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('API_Status_Report.pdf'));

    // Title
    doc.fontSize(20).text('API Status Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    const workingApis = [];
    const failedApis = [];

    console.log("Running tests...");

    for (const endpoint of endpoints) {
        try {
            const res = await axios({
                method: endpoint.method,
                url: `${baseUrl}${endpoint.url}`,
                validateStatus: () => true
            });

            const isWorking = res.status !== 404 && res.status !== 500 && res.status !== 502;
            const data = {
                method: endpoint.method,
                url: endpoint.url,
                status: res.status
            };

            if (isWorking) {
                workingApis.push(data);
            } else {
                failedApis.push(data);
            }
        } catch (error) {
            failedApis.push({
                method: endpoint.method,
                url: endpoint.url,
                status: error.code || 'ERROR'
            });
        }
    }

    // Working APIs Table
    doc.fontSize(16).fillColor('green').text(`Correctly Working APIs (${workingApis.length})`);
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('black');

    let y = doc.y;
    doc.text('Method', 50, y);
    doc.text('Endpoint', 120, y);
    doc.text('Status', 450, y);
    doc.moveDown(0.5);

    // Draw line
    doc.moveTo(50, doc.y).lineTo(500, doc.y).stroke();
    doc.moveDown(0.5);

    workingApis.forEach(api => {
        const currentY = doc.y;
        if (currentY > 700) { doc.addPage(); }
        doc.text(api.method, 50, doc.y);
        doc.text(api.url, 120, doc.y);
        doc.text(api.status.toString(), 450, doc.y);
        doc.moveDown(0.5);
    });

    doc.moveDown(2);

    // Failed APIs Table
    doc.fontSize(16).fillColor('red').text(`Failed APIs (${failedApis.length})`);
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('black');

    y = doc.y;
    doc.text('Method', 50, y);
    doc.text('Endpoint', 120, y);
    doc.text('Status', 450, y);
    doc.moveDown(0.5);

    doc.moveTo(50, doc.y).lineTo(500, doc.y).stroke();
    doc.moveDown(0.5);

    if (failedApis.length === 0) {
        doc.text('No failed APIs found.', 50, doc.y);
    } else {
        failedApis.forEach(api => {
            doc.text(api.method, 50, doc.y);
            doc.text(api.url, 120, doc.y);
            doc.text(api.status.toString(), 450, doc.y);
            doc.moveDown(0.5);
        });
    }

    doc.end();
    console.log("PDF Report generated: API_Status_Report.pdf");
}

generateReport();
