FROM python:3.7

ADD requirements.txt .
RUN pip install -r requirements.txt

ADD . /app
WORKDIR /app

VOLUME /app/api/migrations

CMD python manage.py makemigrations api && \
    python manage.py migrate && \
    gunicorn backend.wsgi --bind 0.0.0.0:8000 -w 8

EXPOSE 8000