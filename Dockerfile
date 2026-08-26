FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
# pyinstaller/pywin32-ctypes/pefile/altgraph are Windows-only build tooling,
# unused by the Django app itself, and fail to install on Linux.
RUN grep -viE '^(pyinstaller|pyinstaller-hooks-contrib|pywin32-ctypes|pefile|altgraph)==' requirements.txt > requirements.docker.txt \
    && pip install --no-cache-dir -r requirements.docker.txt gunicorn

COPY . .
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["./docker-entrypoint.sh"]
