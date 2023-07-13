<?php
require_once($_SERVER['DOCUMENT_ROOT']."/back/model/HelperMySql.php");

$usr="root"; 
$pass="root"; 
$host="localhost:3306";
$d="videojuegos_lista";
$lang = "es_ES"; 
$sqli = new HelperMySql($host,$usr,$pass,$d);
?>