FROM python:3.7-slim

COPY ./requirements/base.txt /backend/requirements/base.txt
COPY ./requirements/local.txt /backend/requirements/local.txt
RUN pip install --no-cache-dir -r /backend/requirements/local.txt

ENV PYTHONUNBUFFERED=1

COPY ./ /backend/
WORKDIR /backend/

RUN chmod +x /backend/entrypoint

CMD ["/backend/entrypoint"]
