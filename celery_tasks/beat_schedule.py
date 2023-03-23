from datetime import timedelta, time
from celery.schedules import crontab

beat_schedule = {
    # 'hello_world': {
    #     'task': 'celery_tasks.tasks.hello_world',
    #     'schedule': timedelta(minutes=1),
    # },
    # 'get_upcomming_plan': {
    #     'task': 'accounts.tasks.get_upcomming_plan',
    #     'schedule': timedelta(seconds=10)
    # },
    # 'print_tomorrow': {
    #     'task': 'accounts.tasks.print_tomorrow',
    #     'schedule': crontab(minute=[7, 9, 11, 13])
    # },
    'test': {
        'task': 'accounts.tasks.test',
        'schedule': timedelta(seconds=30)
    }
}
