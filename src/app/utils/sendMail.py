import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import os

def send_email(sender_email, loginId, sender_password, receiver_emails, Cc_mails, subject, html, attachment_path=None):
    # Create a multipart message
    message = MIMEMultipart()
    message["From"] = sender_email
    # receiver_emails.append(sender_email)
    
    # Don't modify the original receiver_emails list
    to_recipients = receiver_emails.copy()
    # to_recipients.append(sender_email)
    message["To"] = ", ".join(to_recipients)  # Join multiple recipient emails
    message["Cc"] = ", ".join(Cc_mails)  # Join multiple recipient emails
    message["Subject"] = subject

    # Add body to email
    message.attach(MIMEText(html, "html"))
    successMsg = "MAIL NOT SENT"

    # Attach PDF file if provided
    if attachment_path:
        filename = os.path.basename(attachment_path)
        with open(attachment_path, "rb") as f:
            attachment = MIMEApplication(f.read(), Name=filename)
        attachment["Content-Disposition"] = f"attachment; filename={filename}"
        message.attach(attachment)

    try:
        # Create SMTP session for sending the mail
        with smtplib.SMTP("mail.grid-india.in", 587) as server:
            server.starttls()  # Enable security
            # Login with sender credentials
            server.login(loginId, sender_password)
            # Send email
            # server.send_message(message)
            # IMPORTANT: Include both TO and CC recipients in the actual sending
            all_recipients = to_recipients + Cc_mails
            server.sendmail(sender_email, all_recipients, message.as_string())
        # print("Email sent successfully")
        successMsg = "Email sent successfully"
        return successMsg
    except Exception as e:
        print(f"An error occurred while sending the email: {str(e)}")
        return successMsg


# html = """\
# <html>
#   <head></head>
#   <body>
#     <p>Hi!<br>
#        How are you?<br>
#        Here is the <a href="https://www.python.org">link</a> you wanted.
#     </p>
#   </body>
# </html>
# """
# sender_email = "@grid-india.in"
# sender_password = ""  # Use an app password, not your regular password
# loginId = "NLDC\\00"
# receiver_emails = ["dheerajgupta@grid-india.in", "'nagasudhirpulla@gmail.com"]
# subject = "Test Email from Python"
# body = "This is a test email sent from Python!"
# attachment_path = "ViolMsgReport_LD_9_1.pdf"

# send_email(sender_email, loginId, sender_password, receiver_emails, subject, html, attachment_path)