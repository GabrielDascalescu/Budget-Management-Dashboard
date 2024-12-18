<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $email = $_POST['email'];

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
        $to = $email;
        $subject = "Password Reset Request";
        $message = "Hello,\n\nPlease click the link below to reset your password:\n\n";
        $message .= "";
        $message .= "\n\nIf you did not request a password reset, please ignore this email.";


        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.sendgrid.net';
            $mail->SMTPAuth = true;
            $mail->Username = 'apikey';
            $mail->Password = '';
            $mail->SMTPSecure = 'tls';
            $mail->Port = ;

            
            $mail->setFrom('', ''); 
            $mail->addAddress($to); 


            $mail->isHTML(false);
            $mail->Subject = $subject;
            $mail->Body    = $message;

            if ($mail->send()) {
                echo "If the email is associated with any account, you will receive an email with the reset link.";
            } else {
                echo "Failed to send the email. Please try again later.";
            }
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo "Invalid email format.";
    }
} else {
    echo "No email provided.";
}
?>