<html>
 <head>
  <title>硬件测试</title>
 </head>
 <body>
 <?php echo '<p>收到数据:</p>'; ?>
 <?php $content1 = strval($_REQUEST['keyboxid']);
 $file = 'log.txt';
 if($f = file_put_contents($file,$content1,FILE_APPEND)) echo 'success!<br>';

$content2=strval($_REQUEST['userid']);
 if($f = file_put_contents($file,$content2,FILE_APPEND)) echo 'success!!<br>';
 ?>

 </body>
</html>