# syntax=docker/dockerfile:1.4

# Use a base Python image
FROM python:3.12-slim-bookworm AS base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

# Install curl for downloading uv
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# Set working directory
WORKDIR /app

# Copy project files
COPY pyproject.toml uv.lock ./
COPY . .

# Install project dependencies using uv
RUN uv sync --frozen --no-dev

# Expose the port your Flask app runs on
EXPOSE 5000

# Set the default command to run your Flask app
CMD ["uv", "run", "python", "app.py"]
