const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const q = url.parse(req.url, true).query;  // อ่าน query string จาก URL
    const name = q.name || 'Unknown';          // ตั้งค่า default หากไม่มี
    const subject = q.subject || 'Unknown';
    const score = q.score || 'Unknown';

    // สร้างข้อความผลลัพธ์ที่จะเก็บในไฟล์ hello.htm
    const result = `
name => name: ${name}
subject => subject: ${subject}
score => score: ${score}
`;

    // อ่านไฟล์ hello.htm และแทนที่เนื้อหาด้วยผลลัพธ์ใหม่
    fs.readFile('hello.htm', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            return res.end('Error reading file');
        }

        // เปลี่ยนเนื้อหาของไฟล์ hello.htm ด้วยข้อมูลจาก URL
        let htmlContent = data.toString();
        htmlContent = htmlContent.replace(/name: .*<\/p>/, `name: ${name}</p>`);
        htmlContent = htmlContent.replace(/subject: .*<\/p>/, `subject: ${subject}</p>`);
        htmlContent = htmlContent.replace(/score: .*<\/p>/, `score: ${score}</p>`);

        // บันทึกผลลัพธ์ลงในไฟล์ hello.htm
        fs.writeFile('hello.htm', htmlContent, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                return res.end('Error writing to file');
            }
        });

        // ส่งข้อมูลกลับไปยังเว็บเบราว์เซอร์
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlContent);
        res.end();
    });

}).listen(3333, () => {
    console.log('Server running at http://localhost:3333/');
});
