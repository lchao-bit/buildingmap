<?php
$myfile = fopen("project_records", "a") or die("Unable to open file!");
$txt = $_POST["info"] . "\n";
fwrite($myfile, $txt);
fclose($myfile);
?>
