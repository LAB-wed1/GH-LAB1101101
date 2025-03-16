<?php
// Connect to the database
$conn = mysqli_connect("localhost", "root", "", "RegisterDB");
$conn->query("SET NAMES UTF8");

// Get form data
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$age = !empty($_POST['age']) ? (int)$_POST['age'] : 0; // Convert to integer and use 0 if empty
$gender = $_POST['gender'];
$avatar = $_POST['avatar'];

// Insert data into the database
$sql = "INSERT INTO register (FirstName, LastName, Age, Gender, Photo) 
        VALUES ('$firstname', '$lastname', '$age', '$gender', '$avatar')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Record added successfully');</script>";
    echo "<script>window.location.href='editForm.php';</script>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>