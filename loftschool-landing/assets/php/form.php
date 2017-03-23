<?php
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $street = $_POST['street'];
  $comment = $_POST['comment'];
  $callback = isset($_POST['callback']) ? 'Перезвоните мне' : 'Не перезванивать';
  $payment = $_POST['payment'] == 'change' ? 'Потребуется сдача' : 'Оплата по карте';
  
  $message = "Сообщение от $name \n Адресс: $street \t $phone \n $comment \n $payment \t $callback";

  $result = mail('somemailForTesting@mailforTesting.tets', 'Mail theme', $message);

  echo json_encode(array(
  		'status' => $result
  		));
?>