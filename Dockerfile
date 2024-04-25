FROM python:slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
# 设置运行模式
ENV MODE=prod

COPY . .

RUN pip install --no-cache-dir -r requirements.lock

ENTRYPOINT ["python", "-m", "run"]
