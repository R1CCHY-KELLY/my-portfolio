<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	die("Invalid request.");
}

require "db.php";

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");

if(empty($name) || empty($email) || empty($message)) {
	header("Location: ../index.html?error=empty#contact");
	exit;
}

if(strlen($name) > 100){
	header("Location: ../index.html?error=name_length#contact");
	exit;
}
if(strlen($email) > 150){
	header("Location: ../index.html?error=email_length#contact");
	exit;
}
if(strlen($message) > 1000){
	header("Location: ../index.html?error=message_length#contact");
	exit;
}

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
	header("Location: ../index.html?error=email#contact");
	exit;
}

$sql = "INSERT INTO contact_messages(name, email, message) VALUES(?, ?, ?)";

$stmt = $conn -> prepare($sql);

$stmt -> bind_param("sss", $name, $email, $message);

if($stmt -> execute()){
	header("Location: ../index.html?success=1#contact");
	exit;
}else{
	echo "Something went wrong.";
}

$stmt->close();
$conn->close();

?>