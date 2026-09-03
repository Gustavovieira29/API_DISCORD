# Imagem base: servidor web nginx, versao leve (alpine)
FROM nginx:alpine

# Remove a pagina padrao do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia apenas os arquivos que a pagina realmente usa
COPY index.html /usr/share/nginx/html/index.html
COPY pessoaFisica.js /usr/share/nginx/html/pessoaFisica.js

# Porta padrao do nginx
EXPOSE 80