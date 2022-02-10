#!/bin/bash

python -m venv env
source env/bin/activate

pip install -r back/requirements.txt

cd front/neo-talk
npm install
cd ../..
