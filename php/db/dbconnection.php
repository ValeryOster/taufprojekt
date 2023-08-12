<?php

$servername = "localhost";
$username = "root";
$password = "777@Matriza";
$dbname = "heiligen";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname );

// Check connection
//if ($conn->connect_error) {
//  die("Connection failed: " . $conn->connect_error);
//}
//echo "Connected successfully";
//
//if($result = $conn->query('SHOW TABLES')){
//    while($row = $conn->fetch_array($result)){
//        $tables[] = $row[0];
//        echo $tables;
//    }
//}
//echo "\nEnds";
