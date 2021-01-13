FROM python:3.8
COPY requirements.txt .
RUN pip install -r requirements.txt
ADD templates ./templates
COPY web_svc.py .
EXPOSE 7080
ENTRYPOINT ["gunicorn","-b","0.0.0:7080","-w","4","web_svc:app"]
