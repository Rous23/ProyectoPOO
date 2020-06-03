<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require '../phpmailer/Exception.php';
    require '../phpmailer/PHPMailer.php';
    require '../phpmailer/SMTP.php';
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 0;                     
        $mail->isSMTP();                                            
        $mail->Host       = 'smtp.gmail.com';                   
        $mail->SMTPAuth   = true;                                  
        $mail->Username   = 'luxuaryproyectopoo@gmail.com';               
        $mail->Password   = 'proyectoPOO1';                           
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   
        $mail->Port       = 587;                              
        //Recipients
        $mail->setFrom('luxuaryproyectopoo@gmail.com', 'USUARIO');
        $mail->addAddress('rosaavila14.2015@gmail.com', 'Joe User');

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Asuntu';
        $mail->Body    = 'Bienvenido';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
?>