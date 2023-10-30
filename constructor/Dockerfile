# Стартовый образ
FROM python:3.11-alpine

# рабочая директория
# WORKDIR /usr/src/app
WORKDIR /constructor

# RUN mkdir -p $WORKDIR/static
# RUN mkdir -p $WORKDIR/media

# переменные окружения для python
#не создавать файлы кэша .pyc
ENV PYTHONDONTWRITEBYTECODE 1
# не помещать в буфер потоки stdout и stderr
ENV PYTHONUNBUFFERED 1

# обновим pip
# RUN pip install --upgrade pip

# скопируем и установим зависимости. эта операция закешируется 
# и будет перезапускаться только при изменении requirements.txt
# COPY ./requirements.txt .
# RUN pip install -r requirements.txt

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

RUN python -m pip install psycopg


# копируем всё что осталось.
COPY . .

EXPOSE 8000

# Run the application.
CMD python manage.py runserver 0.0.0.0:8000 --insecure