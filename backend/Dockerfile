# syntax=docker/dockerfile:1.4

FROM python:3.12-slim-bookworm AS base

# Install curl, git and build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates gcc g++ git && \
    rm -rf /var/lib/apt/lists/*

# Install uv globally
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# Ensure uv is available in PATH
ENV PATH="/root/.cargo/bin:$PATH"

WORKDIR /app

# Copy project metadata
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen --no-dev

# Copy source code
COPY . .

# Expose Flask port
EXPOSE 5000

# Run app
CMD ["uv", "run", "python", "app.py"]
