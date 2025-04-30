FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt /app/

RUN pip install -r requirements.txt --no-cache-dir

COPY . /app/

EXPOSE 8000

CMD ["gunicorn", "tlog_backend.wsgi:application", "--bind", "0.0.0.0:8000"]