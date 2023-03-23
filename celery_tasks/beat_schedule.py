from datetime import timedelta, time
from celery.schedules import crontab

beat_schedule = {
    # 'hello_world': {
    #     'task': 'celery_tasks.tasks.hello_world',
    #     'schedule': timedelta(minutes=1),
    # },
    'get_upcoming_plans': {
        'task': 'accounts.tasks.get_upcoming_plans',
        'schedule': timedelta(minutes=5),
    },
    # 'print_tomorrow': {
    #     'task': 'accounts.tasks.print_tomorrow',
    #     'schedule': crontab(minute=[7, 9, 11, 13])
    # },
    'test': {
        'task': 'accounts.tasks.test',
        'schedule': timedelta(seconds=30)
    }
}
