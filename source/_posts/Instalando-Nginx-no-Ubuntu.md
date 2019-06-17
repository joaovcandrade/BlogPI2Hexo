---
title: Instalando Nginx no Ubuntu
resume: O Nginx já está embutido nos repositórios padrões do Ubuntu, ao menos na versão 18.04.
visible: true
author: a1
date: 2019-06-17 14:39:06
subtitle:
updated:
tags:
---

# Instalando Nginx no Ubuntu


## 1 - Instalando o Nginx

O **Nginx** já está embutido nos repositórios padrões do Ubuntu, ao menos na versão _18.04_, por isso é possível instalá-lo utilizando o comando **_apt_**.

antes de qualquer coisa para instalar o **_Nginx_**, por segurança, precisamos atualizar os pacotes existentes.

```bash
$ sudo apt update
```

e agora instalamos o **_Nginx_**, com o seguinte comando:

```bash
$ sudo apt install nginx
```

Pronto! **Nginx** instalado.


## 2 - Firewall

Antes de prosseguir com o **_Nginx_**,  vamos para um passo muito importante: O _firewall_.

O _firewall_ é muito importante para a segurança do nosso servidor. Vamos utilizar o **_UFW_** como firewall, pois já vem instalado no Ubuntu e o** Nginx **já se registra automaticamente para o **_ufw_**.

Vamos listar os aplicativos que o **_ufw_** trabalha:

```bash
$ sudo ufw app list
```

Você deve receber algo como isso:

```{r, Output=bash}
Available applications:

  Nginx Full

  Nginx HTTP

  Nginx HTTPS
```

O **Nginx** _HTTP_ abre a porta 80, _HTTPS_ a porta 443 e o full ambas portas.

Caso tenha um _SSL_ configurado para o servidor, certamente a melhor escolha é o ***HTTP***, pois o tráfego é criptografado, caso não, é melhor ativar o ***HTTP***, que utiliza tráfego não criptografado.

Para habilitar digite:

```bash
$ sudo ufw allow 'Nginx HTTP'
```
ou
```bash
$ sudo ufw allow 'Nginx HTTPS'
```

Para verificarmos todos os tráfego permitidos no **_ufw_**, digite:

```bash
$ sudo ufw status
```

Você deve receber uma lista que contém o **Nginx**, mas caso retorne Status: inativo, o **_firewall_** está desativado. Para ativar digite:

```bash
$ sudo ufw enable
```

Tente verificar o status novamente.


## 3 - Verificando o Nginx

Ok, **Nginx** instalado e **_firewall_** configurado, e agora ? Vamos verificar se nosso servidor está funcionando como webserver !.

Por padrão, o **Nginx** vem com uma página padrão de boas-vindas para que possamos verificar se tudo está funcionando como deveria.

Antes você precisa saber o IP do servidor, com ele em mãos, vá no seu navegador e digite:

```{r, Navegador=bash}
http://ip-do-servidor
```

_Onde indica **ip-do-servidor**, substitua pelo seu ip obtido._

Você já deve conseguir ver a página do **Nginx**:

{% asset_img welcome.png %}

## 4 - Configurando seu website

O **Nginx** possui uma estrutura de arquivos que permite que possamos servir vários sites no mesmo servidor.

Supondo que meu domínio é_ meuexemplo.com_, os sites devem devem  ser mantido dentro de _/var/www_, por isso, dentro deste caminho, crie um diretório com o nome de _meuexemplo.com_ e dentro, os arquivos html do site.

***A partir de agora, quando aparecer meuexemplo.com, substitui.***

Crie o diretório:

```bash
$ sudo mkdir  /var/www/meuexemplo.com
```

Provavelmente você não vai conseguir fazer nada dentro deste diretório, pois lhe falta permissões, digite:

```bash
$ sudo chown -R $USER:$USER /var/www/meuexemplo.com
$ sudo chmod -R 755 /var/www/meuexemplo.com
```


Agora coloque todos os arquivos do seu site dentro deste diretório.

O conteúdo a ser servido pelo **Nginx** está no lugar certo pronto, porém temos fazer configurações para que o **Nginx** saiba o que e como deve servir.

Dentro de _/etc/nginx_, há dois diretórios chamado** _sites-available_** e **_sites-enabled_**, o primeiro indica os sites disponíveis e suas configurações, porém o **Nginx** não fará nada com essas configurações, o que nos leva pro segundo diretório, que indica os sites habilitados no servidor, onde as configurações serão lidas pelo **Nginx**.

Dito tudo isso, a idéia é o seguinte: criamos as configurações em **_sites-available_** e por fim vinculamos essas configurações ao **_sites-enabled_**, para que o **Nginx** leia as configurações.

Por isso vamos criar nosso arquivo de configuração do site em _sites-available_ com o seguinte comando:

 ```bash
$ sudo nano /etc/nginx/sites-available/meuexemplo.com
```


Você estará dentro do arquivo de configuração, coloque essa configuração:

  ```{r, meuexemplo=bash}
server {

        listen 80;

        listen [::]:80;

        root /var/www/meuexemplo.com;

        index index.html index.htm index.nginx-debian.html;

        server_name meuexemplo.com www.meuexemplo.com;

        location / {

                try_files $uri $uri/ =404;
        }

}
 ```

**_listen_**: porta  a ser ouvida pelo Nginx;

**_root_**: diretório raiz do site;

**_server_name_**: nome de domínio, caso não tenha domínio, temporariamente use o ip do servidor;

Essa configuração é a padrão, há variedades de configurações que podem ser feita, mas para isso, leia a documentação do **Nginx**.

Agora que nosso arquivo de configuração foi criado em _sites-available_, vamos linkar o arquivo com _sites-enabled,_ para que o **Nginx** possa ler o mesmo:

```bash
$ sudo ln -s /etc/nginx/sites-available/meuexemplo.com /etc/nginx/sites-enabled/
```


O **Nginx** vai responder todas as requisições feitas em meuexemplo.com. Agora é só reiniciar o **Nginx** e testar o servidor:

```bash
$ sudo systemctl restart nginx
```

Teste o servidor digitando o endereço de domínio no navegador, caso não usou o domínio, o endereço de ip.

Pronto! **Nginx** configurado e funcionando.
