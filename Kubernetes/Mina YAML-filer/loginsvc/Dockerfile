FROM python:latest
COPY login_svc.py ./
COPY requirements.txt ./
RUN pip install -r requirements.txt
ENTRYPOINT ["gunicorn","-b","0.0.0:7070","-w","4","login_svc:app"]
