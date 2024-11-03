FROM python:3.12.2-slim
WORKDIR /app
COPY . ./
RUN PYTHONDONTWRITEBYTECODE=1 pip install --no-cache-dir -r requirements.lock 
CMD ["python", "-m", "app.main", "-m" ,"prod"]
