<?php
require_once( 'edit.php' );
$pdfCreator = new CreatePDFFromTamplate();
$pdfCreator->createPDFFromTamplate($_POST);