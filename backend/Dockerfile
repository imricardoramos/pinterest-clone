FROM python:3.13-slim

# Required for Pillow
RUN apt update && apt install -y build-essential python3-dev libffi-dev
COPY ./requirements/base.txt /backend/requirements/base.txt
COPY ./requirements/local.txt /backend/requirements/local.txt
RUN pip install --no-cache-dir -r /backend/requirements/local.txt

ENV PYTHONUNBUFFERED=1

COPY ./ /backend/
WORKDIR /backend/

RUN chmod +x /backend/entrypoint

CMD ["/backend/entrypoint"]
