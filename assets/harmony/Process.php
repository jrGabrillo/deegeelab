<?php
//secure this file
include("Functions.php");
session_start();
$function = new DatabaseClasses;
    if(isset($_GET['send-mail'])){
        $data = $_POST['data'];
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: RNR Digital Consultancy <rnrdigitalconsultancy.com>' . "\r\n";
        $receiver = $data[0];
        $subject =  $data[1];
        $message = $data[2];

        $result = mail($receiver,$subject,$message,$headers);
        print_r($result);
    }

    if(isset($_GET['set-leads'])){
        $id = $function->PDO_IDGenerator('tbl_leads','id');
        $date = $function->PDO_DateAndTime();
        $data = $_POST['data'];
      
        $name = $function->escape($data[0]);
        $business = $function->escape($data[1]);
        $email = $function->escape($data[2]);
        $number = $function->escape($data[3]);
        $postal = $function->escape($data[4]);
        $dateSchedule = $function->escape($data[5]);
        $timeSchedule = $function->escape($data[6]);
        $message = $function->escape($data[7]);

        $query = $function->PDO(false,"INSERT INTO tbl_leads(id,name,email,message,phone,business_name,booked_date,booked_time,postal,`date`) VALUES ('{$id}',{$name},{$email},{$message},{$number},{$business},{$dateSchedule},{$timeSchedule},{$postal},'{$date}')");
        if($query->execute()){
            $message_admin = "<style type='text/css'>body{background-color: #cccccc3d;}</style><div class='box' style='width: 600px; min-height: 550px; box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0); center; margin: 0 auto; font-family: arial;'> <div style='width: 100%; margin:auto;'> <div style='box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1), 0 0px 5px 0 rgba(0, 0, 0, 0.1);border-radius: 5px;overflow: hidden;border: 1px solid #ccc;'> <div style='padding:10px 0px 10px 0px;text-align: center;height: 100px; background: url(http://www.deegeelab.com/assets/images/email/header.png) top/cover no-repeat;'> </div><div style='text-align: center; background: white;padding: 20px 50px 50px 50px;'> <ul style='list-style-type: none;display: -webkit-inline-box !important;display: inline-flex;-webkit-padding-start: 0px;'> <li><img src='http://www.deegeelab.com/assets/images/email/bell-icon.png' style='width: 40px; display: inline-block; position: relative;'/></li><li><h4 style='margin: 0px 0px 0px 10px;top: 10px;position: relative;font-size: 20px;text-align: left;'>You received a consultation appointment request</h4></li></ul> <div style='text-align:left;color:#000;margin: 0px 0px 60px 0px;'> <p>Name:</strong><br>{$data[0]}</p><p>Business:</strong><br>{$data[1]}</p><p>Email:</strong><br>{$data[2]}</p><p>Number:</strong><br>{$data[3]}</p><p>Postal:</strong><br>{$data[4]}</p><p>Scheduled Date:</strong><br>{$data[5]}{$data[6]}</p><p>Message:</strong><br>{$data[7]}</p></div><div style='border-top: 1px solid #ccc; max-width: 98%; margin:0 auto;'></div><ul style='display: block !important;'> <li><div style='width: 200px; height: 155px; display: inline-block; position: relative; background: url(http://www.deegeelab.com/assets/images/email/logo.png) top/cover no-repeat;'></div></li><li><span style='margin: 0px 0px 0px 10px; top: 10px; position: relative; font-size: 12px;'>Deegeelab &copy; 2018. All rights reserved.</span></li></ul> </div></div></div></div>";

            // $message_client = "<style type='text/css'>body{background-color: #cccccc3d;}ul{list-style-type: none; display: -webkit-inline-box !important; display: inline-flex; -webkit-padding-start: 0px;}</style><div class='box' style='width: 600px; min-height: 550px; box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0); center; margin: 0 auto; font-family: arial;'> <div style='width: 100%; margin:auto; background: #fff;'> <div style='box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1), 0 0px 5px 0 rgba(0, 0, 0, 0.1);border-radius: 5px;overflow: hidden;border: 1px solid #ccc;'> <div style='padding:10px 0px 10px 0px;text-align: center;height: 100px; background: url(http://www.deegeelab.com/assets/images/email/header.png) top/cover no-repeat;'> </div><div style='background: url(http://www.deegeelab.com/assets/images/email/footer.png) no-repeat;background-position: bottom right;padding: 20px 50px 100px 50px;'> <ul> <li><img src='http://www.deegeelab.com/assets/images/email/bell-icon.png' style='width: 40px; display: inline-block; position: relative;'></li><li><h4 style='margin: 0px 0px 0px 10px;top: 10px;position: relative;font-size: 20px;text-align: left;'>Email confirmation</h4></li></ul> <div style='text-align:left;color:#000;margin: 0px 0px 60px 0px;'> <p>Hi {$data[0]},</p><p>Welcome to Deegeelab! We received your request to book a consultation appointment with our team. Please expect a call from our representative on your preferred date and time.</p><p>We look forward to hearing more about your business and learning how we can help you reach your goals.</p><p>Thank you,<br>Deegeelab</p></div><ul> <li> <ul style='display: block !important;'> <li> <a href='https://www.facebook.com/DeeGeeLabAU/' style='width: 40px; height: 40px; display: inline-block; position: relative; background: url(http://www.deegeelab.com/assets/images/email/facebook.png) top/cover no-repeat;'></a> <a href='https://www.instagram.com/deegeelab/' style='width: 40px; height: 40px; display: inline-block; position: relative; background: url(http://www.deegeelab.com/assets/images/email/twitter.png) top/cover no-repeat;'></a> <a href='https://twitter.com/DeegeelabAU' style='width: 40px; height: 40px; display: inline-block; position: relative; background: url(http://www.deegeelab.com/assets/images/email/ig.png) top/cover no-repeat;'></a> </li><li><span style='font-size: 12px;'>Email sent by Deegeelab<br>Deegeelab © 2018. All rights reserved.</span></li></ul> </li><li> </li></ul> <div style='width: 150px;height: 120px;float:right;display: inline-block;position: relative;top: 75px;right: -30px;background: url(http://www.deegeelab.com/assets/images/email/logo.png) top/cover no-repeat;'></div></div></div></div></div>";

            $bcc = "Bcc: rufo.gabrillo@gmail.com, errol@deegeelab.com, rey@rnrdigitalconsultancy.com, rey@deegeelab.com" . "\r\n";
            $mail_admin = $function->mail('info@deegeelab.com, vinay@deegeelab.com',"New leads for attention",$message_admin,$bcc);
            // $mail_client = $function->mail($data[2],"Welcome to Deegeelab",$message_client,"");
            print_r($mail_admin);
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }
?>