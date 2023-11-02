<?php
include "dbconnection.php";


$searchName = $_POST['searchName'];
if ( isset( $searchName ) ) {
	$Query     = "SELECT * FROM heiligen WHERE name LIKE '%$searchName%'";
}else {
	$searchDate = $_POST['searchDate'];
	$Query     = "SELECT * FROM heiligen WHERE date like '$searchDate'";
}
$ExecQuery = MySQLi_query( $conn, $Query );


$finalResult = array();
$i = 0;
if ( $ExecQuery->num_rows > 0 ) {
		while ( $Result = MySQLi_fetch_array( $ExecQuery ) ) {
			$finalResult[ $i ]['name'] = $Result['name'];
			$finalResult[ $i ]['date'] = $Result['date'];
			$finalResult[ $i ]['ehre'] = $Result['ehre'];
			$finalResult[ $i ]['description'] = $Result['description'];
			$i ++;
		}
	}

	$json_encode = json_encode( $finalResult );
	echo $json_encode;
	die();

