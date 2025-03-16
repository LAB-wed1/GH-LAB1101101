<?php
// สร้างคลาส Data เพื่อใช้เก็บข้อมูลของผู้ใช้
class Data {
    public $firstname = "";
    public $lastname = "";
    public $age = 0;
    public $gender = "";
    public $photo = "";
}

// ตรวจสอบว่ามีพารามิเตอร์ 'name' ถูกส่งมาหรือไม่
if (!isset($_GET["name"]) || empty($_GET["name"])) {
    echo json_encode(["error" => "Missing 'name' parameter"]);
    exit;
}

$name = $_GET["name"];

// เชื่อมต่อฐานข้อมูล MySQL
$conn = new mysqli("localhost", "root", "", "RegisterDB");

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// ตั้งค่าการเข้ารหัสข้อมูลเป็น UTF-8
$conn->set_charset("utf8");

// ใช้ Prepared Statement เพื่อป้องกัน SQL Injection
$sql = "SELECT FirstName, LastName, Age, Gender, Photo FROM register WHERE FirstName LIKE ?";
$stmt = $conn->prepare($sql);
$searchName = "%" . $name . "%"; 
$stmt->bind_param("s", $searchName);
$stmt->execute();
$result = $stmt->get_result();

$myObj = null;

// ตรวจสอบว่ามีข้อมูลหรือไม่
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    $myObj = new Data();
    $myObj->firstname = $row["FirstName"];
    $myObj->lastname = $row["LastName"];
    $myObj->age = (int)$row["Age"];
    $myObj->gender = $row["Gender"];
    $myObj->photo = $row["Photo"];
}

// ตั้งค่า Header เป็น JSON และส่งข้อมูลกลับ
header('Content-Type: application/json');
echo json_encode($myObj ?: ["message" => "No data found"]);

// ปิดการเชื่อมต่อฐานข้อมูล
$stmt->close();
$conn->close();
?>
