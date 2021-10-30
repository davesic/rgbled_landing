<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['name'];
$phone = $_POST['phone'];
$telega = $_POST['telega'];
$token = "token";
$chat_id = "chatid";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Телеграм или вайбер или инст:' => $telega
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: form-ok.php');
} else {
  echo "Error";
}
?>