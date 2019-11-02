FROM python:3.7

ADD requirements.txt .
RUN pip install -r requirements.txt

ADD . /app
WORKDIR /app

VOLUME /app/api/migrations

CMD python manage.py makemigrations api && \
    python manage.py migrate && \
    python manage.py runserver 0.0.0.0:8000

EXPOSE 8000