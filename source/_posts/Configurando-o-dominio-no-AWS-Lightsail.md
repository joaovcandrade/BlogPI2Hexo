---
title: Configurando o domínio no AWS Lightsail
resume:  domínio pode ser adquirido em diversos sites que o registram, como por exemplo o
visible: true
author: a1
date: 2019-06-17 15:02:44
subtitle:
updated:
tags:
---
# Configurando o domínio no AWS Lightsail


## 1-Escolhendo do domínio

Antes de fazer de qualquer coisa, obviamente temos que ter um domínio em mão para trabalhar

O domínio pode ser adquirido em diversos sites que o registram, como por exemplo o *_registro.br_* que registra domínios *_.com.br_*.

Para este blog escolhemos comprar o domínio _pi2.online_ na _hostinger_, devido o preço baixo por um nome de domínio amigável (os domínios mais baratos são nomes bizarros), mas poderia ser qualquer nome e qualquer domínio.

{% asset_img hostinger.png %}


## 2- Hospedando o domínio no servidor

Agora vamos, para termos todo o controle do domínio diretamente no nosso servidor, por isso hospedar lá. Primeiramente precisamos criar uma _zona DNS_ na **AWS**, para que possamos receber os servidores de nomes que direcionaram nosso domínio para ela.

 Este procedimento está sendo realizado na **AWS** porém em qualquer hospedagem, o processo é, ou deveria ser, parecido.

Para isso vamos acessar a página do **_Lightsail_** na **AWS** e clicar na seção _Redes_

{% asset_img lights.png %}

Em _redes_, clique em _"Criar zona DNS"_

{% asset_img czona.png %}

Digite o domínio registrado no passo 1 e clique em _“Criar zona DNS”_ para confirmar.

{% asset_img reg1.png %}
{% asset_img reg2.png %}


Você será redirecionado a uma nova página. Agora é hora de criar um registro, para direcionar traduzir o domínio no ip do servidor.

Para isso, clique em _“Adicionar registro”_

no campo subdomínio, coloque _@_, e no campo “é resolvido em”, coloque o ip do servidor ou clique no servidor que aparecerá automáticamente.

{% asset_img nreg1.png %}


O ***@*** indica a própria raiz, pois não queremos acessar o servidor de um subdomínio (mas é possível), ou seja, quem acessar o pi2.online  na verdade estará sendo encaminhado ao servidor.

 Mas e que acessar usando o _“www”_, como _"[www.pi2.online](www.pi2.online)”_ ?, nesse caso temos que fazer mais uma configuração. Clique novamente em _“Adicionar registro”_ e no campo subdomínio, adicione _“www”_ (sem aspas), e em _“é resolvido em”_, pode colocar o ip do servidor novamente.

 {% asset_img nreg2.png %}


Agora sim!, independentemente de o usuário digitar o domínio com _“www”_ ou sem, ele estará acessando o servidor.

Antes de sair da página, ao final dela, você encontrará algo parecido com isso:

{% asset_img sn.png %}


Salve esses dados, é importante para o próximo passo.

Toda configuração na **AWS** está finalizada, agora é hora de configurar direto onde o _domínio_ foi registrado e hospedado.


## 3 - Configurando Servidores de nome no domínio

Agora vamos alterar o servidores de nomes do domínio para que o domínio seja hospedado na **AWS**. Entrando no site onde o _domínio_ foi comprado, procure por editar ”_zona DNS do domínio”_ ou algo parecido.

{% asset_img nreg1.png %}

Agora procure pela seção que indique _“NS”_, _“Nameserver”_ ou _“Servidor de nome”_

Substitua todos esses dados por aqueles dados de _“Name server”_ que obtemos ao configurar a _zona DNS na **AWS**_.

{% asset_img nms.png %}


Agora você pode testar se está funcionando acessando o domínio. Caso o domínio esteja retornando _erro_ ao acessar ou não está retornando o que é esperado, não se preocupe, pode demorar até _72h_ para que todo esse processo finalize completamente.


**Pronto!**, agora o domínio está hospedado na **AWS**, e a _zona DNS_ da **AWS** está configurada para apontar para o nosso servidor.
