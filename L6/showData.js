var xmlHttp;

// ฟังก์ชันสร้าง XMLHttpRequest สำหรับการร้องขอข้อมูลแบบ AJAX
function createXMLHttpRequest() {
    if (window.ActiveXObject) // ตรวจสอบว่าทำงานบน Internet Explorer หรือไม่
    {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); // สร้าง XMLHttpRequest สำหรับ IE
    }
    else // กรณีใช้เบราว์เซอร์อื่น เช่น Firefox, Opera, Safari
    {
        xmlHttp = new XMLHttpRequest(); // ใช้ XMLHttpRequest ปกติ
    }
} 

// ฟังก์ชันที่ใช้จัดการเมื่อสถานะของ XMLHttpRequest เปลี่ยนแปลง
function stateChange() {
    // ตรวจสอบว่าสถานะการโหลดเสร็จสมบูรณ์หรือไม่ (readyState == 4 หรือ complete)
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
        if (xmlHttp.status == 200) { // ตรวจสอบว่าการร้องขอสำเร็จ (HTTP Status Code 200)
            try {
                var data = JSON.parse(xmlHttp.responseText); // แปลง JSON ที่ได้รับเป็นอ็อบเจ็กต์
                alert('' + JSON.stringify(data)); // แสดงข้อมูล JSON ใน Alert Box
                
                if (data) { // ตรวจสอบว่ามีข้อมูลที่ได้รับมาหรือไม่
                    // นำค่าที่ได้จาก JSON ไปเติมลงในฟอร์ม
                    document.forms["myForm"]["lastname"].value = data.lastname;
                    document.forms["myForm"]["age"].value = data.age;
                    document.forms["myForm"]["gender"].value = data.gender;
                    
                    // เปลี่ยนรูปภาพตามข้อมูลที่ได้รับ
                    // ตรวจสอบว่า path ของรูปภาพมี ./avatar/ นำหน้าหรือไม่
                    var photoPath = data.photo;
                    if (photoPath.indexOf('./avatar/') === -1 && photoPath.indexOf('/avatar/') === -1) {
                        photoPath = './avatar/' + photoPath;
                    }
                    document.getElementById("pic").innerHTML = '<img src="' + photoPath + '" width="45">';
                    document.getElementById("hid").value = photoPath;
                } else {
                    // ถ้าไม่พบข้อมูล ให้เคลียร์ค่าในฟอร์มและใช้ค่าเริ่มต้น
                    document.forms["myForm"]["lastname"].value = "";
                    document.forms["myForm"]["age"].value = "";
                    document.forms["myForm"]["gender"].value = "Female"; // ตั้งค่าเริ่มต้นเป็น Female
                    
                    // รีเซ็ตรูปภาพกลับเป็นค่าเริ่มต้น
                    document.getElementById("pic").innerHTML = '<img src="./avatar/avatar1.jpg">';
                    document.getElementById("hid").value = "./avatar/avatar1.jpg";
                }
            } catch (e) { // กรณีเกิดข้อผิดพลาดในการแปลง JSON
                console.error("Error parsing JSON response:", e);
                alert("เกิดข้อผิดพลาดในการรับข้อมูล");
            }
        } 
        
    }
}

// ฟังก์ชันสำหรับค้นหาข้อมูลชื่อ (เรียกใช้ AJAX)
function searchName(str) {
    createXMLHttpRequest(); // เรียกฟังก์ชันเพื่อสร้าง XMLHttpRequest
    xmlHttp.onreadystatechange = stateChange; // กำหนดฟังก์ชัน callback เมื่อสถานะเปลี่ยนแปลง
    
    var url = "data.php?name=" + encodeURIComponent(str);
    xmlHttp.open("GET", url, true); // เปิดการเชื่อมต่อไปยังเซิร์ฟเวอร์ด้วยเมธอด GET
    xmlHttp.send(null); // ส่งคำขอไปยังเซิร์ฟเวอร์
}
