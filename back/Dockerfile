FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DATABASE_URL 'postgresql://neotalk_remote_user:neotalkabj4E55zm76neotalk@postgres-db:5432/neotalk_db'

WORKDIR /back/

COPY ./requirements.txt /back/requirements.txt
RUN pip install -r /back/requirements.txt

COPY . /back/
