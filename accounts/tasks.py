from datetime import date, timedelta
from celery import app
from .models import Plan, Profile, User
import os
from twilio.rest import Client

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

# Creates a new message
# message = client.messages \
#                 .create(
#                     body="Join Earth's mightiest heroes. Like Kevin Bacon.",
#                     from_='+18888366273',
#                     to='+12036152581'
#                 )
# print(message.sid)

today = date.today().strftime('%Y-%m-%d')
tomorrow = str(date.today() + timedelta(days=1))


# @app.shared_task
# def test_text():
#     message = client.messages \
#         .create(
#             body="This is a scheduled test message",
#             from_='+18888366273',
#             to='+12036152581'
#         )
#     print(message.sid)


# @app.shared_task
# def print_tomorrow():
#     print(str(date.today() + timedelta(days=1)), " is tomorrow's date")


@app.shared_task
def test():
    # Get plans that are occuring tomrrow,
    # Get associated user with plan & print their phone number
    # Use phone number in Message{to:phone_number}
    plans = Plan.objects.filter(date=tomorrow)
    for plan in plans:
        print(plan.title)
        print(plan.user.id)
        profiles = Profile.objects.filter(pk=plan.user.id)
        for profile in profiles:
            print(profile.phone_number)


@app.shared_task
def get_upcoming_plans():
    plans = Plan.objects.filter(date=tomorrow)
    for plan in plans:
        print(plan)
        message = client.messages \
            .create(
                body=f"Don't forget about your plan tomorrow - \n{plan.title}:\n {plan.notes} \n\nBy: {plan.user}",
                from_='+18888366273',
                to='+12036152581'
            )
        print(message.sid)

    # for plan in plans:
    #     print(plan)
    # get users with plans
    # check for plans within the next x time frame
    # send SMS
