<?php

require("class.phpmailer.php");


$mail = new PHPMailer;

$body = "";
$subject = "Aurora " . $_SERVER['SERVER_NAME'];
$body = "Поступила заявка :<br/>";
if (isset($_POST["name"])) $body .= "<b>Имя:</b> " . $_POST["name"] . "<br/>";
if (isset($_POST["tel"])) $body .= "<b>Телефон:</b> " . $_POST["tel"] . "<br/>";
if (isset($_POST["email"])) $body .= "<b>Почта:</b> " . $_POST["email"] . "<br/>";


$mail->IsSendmail();
$mail->IsHTML(true);
$mail->FromName = 'HL Sender';
$mail->AddAddress('smart.index@gmail.com');

$mail->CharSet = 'utf-8';
$mail->Subject = $subject;
$mail->Body = $body;

if (!$mail->Send()) {

}


?>