from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import smtplib
from email.message import EmailMessage
from threading import Thread

EMAIL_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.environ.get("SMTP_PORT", 465))
EMAIL_USER = os.environ.get("SMTP_USER")
EMAIL_PASS = os.environ.get("SMTP_PASS")

app = Flask(__name__)
CORS(app, origins=["https://3dznation.com"])

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'stl', 'obj', 'step', 'igs', 'gcode'}
MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def send_email_background(subject, body, to_email, file_path):
    def send():
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = to_email
        msg.set_content(body)

        if file_path and os.path.exists(file_path):
            with open(file_path, 'rb') as f:
                msg.add_attachment(f.read(), maintype='application', subtype='octet-stream', filename=os.path.basename(file_path))

        with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as smtp:
        smtp.login(EMAIL_USER, EMAIL_PASS)
        smtp.send_message(msg)

    Thread(target=send).start()

@app.route('/api/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    subject = request.form.get('subject')
    message = request.form.get('message')
    file = request.files.get('file')

    if not all([name, email, subject, message]):
        return jsonify({'error': 'Missing required fields'}), 400

    filepath = None
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

    email_body = f"From: {name} <{email}>\nPhone: {phone or 'N/A'}\n\n{message}"
    send_email_background(
        subject=f"[Contact] {subject} - {name}",
        body=email_body,
        to_email="support@3dznation.com",
        file_path=filepath
    )

    return jsonify({'message': 'Form submitted successfully'}), 200
