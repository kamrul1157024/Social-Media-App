FROM nginx:1.23.3

RUN apt-get update&&\
  apt-get install -y dnsmasq supervisor
COPY supervisord.conf /etc/supervisord.conf
