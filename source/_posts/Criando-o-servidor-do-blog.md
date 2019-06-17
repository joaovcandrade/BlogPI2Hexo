---
title: Criando o servidor do blog
resume: "Para a escolha do servidor, analisamos 5 opções: Amazon AWS, Microsoft Azure, Google Cloud, Digital Ocean e Vultr"
author: a3
date: 2019-05-26 23:18:41
subtitle:
visible: true
updated:
tags:
---

## Criando o servidor para o blog.

### Escolha do servidor
Para a escolha do servidor, analisamos 5 opções: **Amazon AWS, Microsoft Azure, Google Cloud, Digital Ocean e Vultr**. Dentre todas as opções, optamos por usar o **AWS**, devido oferecer servidores por preço baixo, tempo de uso gratuito, entre outras vantagens.

### Servidores da Amazon
A **AWS (Amazon Web Services)** é uma plataforma de nuvem que possui diversas funcionalidades e mais de 165 serviços. Olhando a funcionalidades de cada serviços, a mais adequada para o nosso objetivo é o **Amazon lightsail**, pois além de oferecer um mês de gratuidade, é uma plataforma para criação rápida e simplificada de servidores virtuais, que de início possui um ambiente de rede, acesso e segurança de fácil configuração.

Uma grande vantagem do **Lightsail**, é que pode ser facilmente usado para ambiente de desenvolvimento rápido e, se necessário, os servidores podem ser fácilmente transferido para a plataforma **EC2**, que possui maiores recursos e o poder de escalabilidade da **Amazon**, que podem ser necessários em uma ambiente de produção

{% asset_img img1.jpeg %}

### Instânciando o servidor
Após entrar/criar conta na AWS e entrar na página da **Amazon Lightsail** e escolher a região do servidor, clique em ***create instanse***.

Selecione o local de instância do servidor, a plataforma e em seguida a imagem do sistema operacional pura ou com apps.

Para o servidor do blog, optamos por instanciar o servidor com somente o **Ubuntu**.

{% asset_img img2.png %}

Em seguida, vem a seleção do plano, chave ssh e o nome do servidor. Para o blog, deixamos no padrão.

Após todo esse processo, clique em criar ***create instance***.

Você deve encontrar algo parecido com isso:

{% asset_img img3.png %}

Pronto!, servidor instanciado. Simples, não?
