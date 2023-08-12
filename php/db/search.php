<?php
include "dbconnection.php";


$search = $_POST['search'];
if (isset( $search )) {
	$Name = $search;
	$Query = "SELECT * FROM heiligen WHERE name LIKE '%$Name%'";
	$ExecQuery = MySQLi_query($conn, $Query);
	echo '
<ul>
   ';
	while ($Result = MySQLi_fetch_array($ExecQuery)) {
		?>
		<li onclick='fill("<?php echo $Result['name']; ?>")'>
			<a>
				<?php echo $Result['name']; ?>
		</li></a>
		<?php
	}}
?>
</ul>
?>