FROM python:latest
COPY post_svc.py ./
COPY requirements.txt ./
RUN pip install -r requirements.txt
ENTRYPOINT ["gunicorn","-b","0.0.0:7075","-w","4","post_svc:app"]

