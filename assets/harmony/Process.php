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
      
        $name = $function->escape($data[0]['value']);
        $business = $function->escape($data[1]['value']);
        $email = $function->escape($data[2]['value']);
        $number = $function->escape($data[3]['value']);
        $postal = $function->escape($data[4]['value']);
        $dateSchedule = $function->escape($data[5]['value']);
        $timeSchedule = $function->escape($data[6]['value']);
        $message = $function->escape($data[7]['value']);

        $query = $function->PDO(false,"INSERT INTO tbl_leads(id,name,email,message,phone,business_name,booked_date,booked_time,postal,`date`) VALUES ('{$id}',{$name},{$email},{$message},{$number},{$business},{$dateSchedule},{$timeSchedule},{$postal},'{$date}')");
        if($query->execute()){
            $message = "<div class='box' style='width: 800px; height: 550px; box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0); center; margin: 0 auto; ; border-radius: 10px; font-family: arial;'>
                            <div class='box' style='width: 100%; margin:auto;'>
                                <div style='box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-radius: 10px;overflow: hidden; border: 1px solid #ccc;'>
                                    <div class='header' style='background: #02bad0; border-top-right-radius: 10px; border-top-left-radius: 10px; padding:10px 0px 10px 0px; text-align: center;'>
                                        You received a message from Deegeelab's contact form
                                    </div>
                                    <div class='container' style='text-align: center; background: white;padding: 10px;'>
                                        <div style='text-align:left; color:#000;'>
                                            <p><strong style='font-weight: bold;'>Name:</strong><br>{$data[0]['value']}</p>
                                            <p><strong style='font-weight: bold;'>Business:</strong><br>{$data[1]['value']}</p>
                                            <p><strong style='font-weight: bold;'>Email:</strong><br>{$data[2]['value']}</p>
                                            <p><strong style='font-weight: bold;'>Number:</strong><br>{$data[3]['value']}</p>
                                            <p><strong style='font-weight: bold;'>Postal:</strong><br>{$data[4]['value']}</p>
                                            <p><strong style='font-weight: bold;'>Scheduled Date:</strong><br>{$data[5]['value']} {$data[6]['value']}</p>
                                            <p><strong style='font-weight: bold;'>Message:</strong><br>{$data[7]['value']}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>";

            $mail = $function->mail('rufo.gabrillo@gmail.com, error@deegeelab.com, rey@rnrdigitalconsultancy.com, rey@deegeelab.com, info@deegeelab.com, vinay@deegeelab.com',"New leads for attention",$message);
            print_r($mail);
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

?>