import random
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
otp = random.randint(1000, 9999)
account_sid = 'AC508029190d7fbec5bd0351ef0825e696'
auth_token = '9552e242109987b34ed142351d009072'
client = Client(account_sid, auth_token)

status = "unknown"


def sendOtp(mobile):
    try:
        message = client.messages.create(
            body='Your OTP is ' + str(otp),
            from_='+15673688597',
            to='+91' + str(mobile)
        )
        status = "sent"
        return message.sid, otp, status
    except TwilioRestException as e:
        status = "failed"
        return None, None, status


sendOtp(1234567890)
