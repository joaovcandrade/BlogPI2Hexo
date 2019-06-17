---
title: Instalando certificado SSL no Nginx
resume: Para instalarmos o certificado SSL, precisamos de uma certificadora que nos forneça o certificado para que o navegador web reconheça a autenticidade do nosso site.
visible: true
author: a1
date: 2019-06-17 15:36:06
subtitle:
updated:
tags:
---
# Instalando certificado SSL no Nginx

Para instalarmos o certificado **SSL**, precisamos de uma certificadora que nos forneça o certificado para que o navegador web reconheça a autenticidade do nosso site.

Geralmente certificadoras cobram um valor para emitir esse certificado, e na maioria dos casos esse valor é bem elevado e pra piorar, o certificado precisa ser renovado periodicamente por um certo valor, mas há luz no fim do túnel, com o **Let’s Encrypt.**


O **Let’s Encrypt** é uma certificadora sem fins lucrativos criada em 2016 que emite certificados gratuitamente e toda essa emissão e renovação é automatizada através do **Certbot**. Por trás dessa certificadora está a linux foundation e é apoiado e mantido por grandes empresas como Chrome, Mozilla, Facebook, Red Hat, entre outros.

{% asset_img logolets.png %}


Com o **Let’s Encrypt** na área não tem desculpa, comunicação encriptada _(HTTPS)_ é quase que obrigatório para quem quiser colocar qualquer conteúdo na web de forma segura.


## 1 - Configuração do Nginx

Antes de tudo, verifique se eu **Nginx** está configurado corretamente:

```
$ sudo nginx -t
```


Caso acuse algum erro, vá até este [post](/post/2019/06/17/Instalando-Nginx-no-Ubuntu/) e tente novamente.


## 2- Instalando o Certbot

Vamos primeiro instalar o **Cerbot**:

```bash
$ sudo add-apt-repository ppa:certbot/certbot
```

Confirme os passos e depois atualize os pacotes:

 ```bash
$ sudo apt update
```

Agora instalamos o **Certbot** para **Nginx**:

 ```bash
$ sudo apt install python-certbot-nginx
```


## 3 - liberando o firewall

Ok, **Certbot** instalado, agora vamos liberar o **_firewall_** para que o **Nginx** tenha permissão de usar o HTTPS.

verifique com:

```bash
$ sudo ufw status
```
Caso não há nada liberado para o **Nginx**, para liberar **_HTTP_** e **_HTTPS_**, use somente:

 ```bash
$ sudo ufw allow 'Nginx Full'
```

Caso algo já esteja liberado, para deletar, use o comando acima com:

 ```bash
$ sudo ufw delete allow 'Nginx HTTP'
```

ou

```bash
$ sudo ufw delete allow 'Nginx HTTPS'
```

No fim, a saída de status deve ficar algo parecido com:

```bash
 $ sudo ufw status
```

```{r, Output=engine}
Status: active

To                         Action      From

--                         ------      ----

OpenSSH                    ALLOW       Anywhere                  

Nginx Full                 ALLOW       Anywhere                  

OpenSSH (v6)               ALLOW       Anywhere (v6)             

Nginx Full (v6)            ALLOW       Anywhere (v6)

```


## 4 - Adquirindo o certificado

Vamos fazer o **Cerbot** emitir um certificado válido para nosso domínio, utilizando um plugin para **Nginx**:

 ```bash
 $ sudo certbot --nginx -d meuexemplo.com -d www.meuexemplo.com```

_troque** meuexemplo.com **pelo** **seu** domínio**_

**-d** : indica os nomes que queremos que o certificado abranja.

Caso seja a primeira execução, pedirá um e-mail que será usado para notificar quando o certificado está para expirar ou ocorrer algum erro, por isso coloque um e-mail válido.

Depois o **Certbot** vai verificar se o domínio pelo qual está pedindo certificado é seu. Caso dê erro nesse processo ou não configurou o domínio visite esse [post](/post/2019/06/17/Configurando-o-dominio-no-AWS-Lightsail/).

Ao fim o Certbot perguntará se você gostaria de redirecionar requisições via **HTTP** _(não encriptado)_ para **_HTTPS_** _(encriptado)_.

 ```bash{r, Output=engine}

Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.

-------------------------------------------------------------------------------

1: No redirect - Make no further changes to the webserver configuration.

2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for

new sites, or if you're confident your site works on HTTPS. You can undo this

change by editing your web server's configuration.

-------------------------------------------------------------------------------

Select the appropriate number [1-2] then [enter] (press 'c' to cancel):
```

Recomendo fortemente que escolha que redirecione, assim evita conexões inseguras e falhas de segurança. Escolha a opção desejada e pressione **ENTER**.

O **Certbot** irá modificar o arquivo de configuração do site no **Nginx** para suportar o certificado **_SSL_** e comunicação **_HTTPS_** automaticamente


## 5 - Renovação do certificado

O certificado expira a cada _90 dias_, mas o **Certbot** automatiza a renovação. Teste se o _script_ de renovação automática está funcionando corretamente

 ```bash
$ sudo certbot renew --dry-run
```


## 6 - Testando o acesso

Agora é hora de testar o _https_, vá até o navegador e digite [https://meuexemplo.com](https://meuexemplo.com) e [https://www.meuexemplo.com](https://www.meuexemplo.com), e verifique se o site carrega. Verifique se acessando utilizando _http://_  é redirecionado ou não, de acordo com sua escolha no **Cerbot.**

**Pronto!** Certificado instalado.
