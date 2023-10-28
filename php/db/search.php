<?php
include "dbconnection.php";


$search = $_POST['search'];
if ( isset( $search ) ) {
	$Name      = $search;
	$Query     = "SELECT * FROM heiligen WHERE name LIKE '%$Name%'";
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
}

function sonderzeichen($string)
{
	$string = str_replace("ä", "ae", $string);
	$string = str_replace("ü", "ue", $string);
	$string = str_replace("ö", "oe", $string);
	$string = str_replace("Ä", "Ae", $string);
	$string = str_replace("Ü", "Ue", $string);
	$string = str_replace("Ö", "Oe", $string);
	$string = str_replace("ß", "ss", $string);
	$string = str_replace("´", "", $string);
	return $string;
}

