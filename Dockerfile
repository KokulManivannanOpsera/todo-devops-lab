# Step 2 — package the todo app so it runs the same everywhere.
# Build:  docker build -t todo-lab:0.1 .
# Run:    docker run --rm -p 8090:8090 -v todo-lab-data:/app/data todo-lab:0.1

FROM python:3.10-slim

WORKDIR /app

# Install deps first (better layer caching when only code changes)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

# Create data dir for SQLite (persist with a volume at run time)
RUN mkdir -p /app/data

ENV PYTHONUNBUFFERED=1

# 0.0.0.0 = accept traffic from outside the container (needed for -p mapping)
EXPOSE 8090
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8090"]
