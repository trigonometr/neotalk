#!/bin/bash

source env/bin/activate

python back/neotalk/manage.py runserver & npm start --prefix front/neo-talk
