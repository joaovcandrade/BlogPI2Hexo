---
title: Gerando o blog com Hexo
date: 30-04-2019 09:12:12
updated:
resume: "O Hexo é um framework de blogs em Nodejs, conhecido por ser rápido na geração de conteúdo"
author: a2

categories:
- [Construindo o blog, Primeiros passos]
tags:
- Primeiro post
- Criação
- Início
- Passo a passo

---

O **Hexo** é um framework de blogs em **Nodejs**, conhecido por ser rápido na geração de conteúdo, muito simples de utilizar, trabalha com **Markdown** e com um poderoso sitema de plugins. O **Hexo** também gera páginas estáticas, tornado fácil de ser hospedado em praticamente em qualquer lugar.

Para começar é necessário simplesmente ter o **Node.js** instalado e começar a usar o npm para instalar o hexo com o seguinte comando:
``` bash
$ npm install -g hexo-cli
```

Após a instalação, é hora de gerar os arquivos iniciais do blog, digitando no terminal:
``` bash
$ hexo init <nome-projeto>
```
* *__nome-projeto__* deve ser substítuido pelo nome de sua preferência.

Após este processo, é hora de entrar na pasta raiz do projeto:
``` bash
$ cd <nome-projeto>
```

Agora vem um passo importante, intalar as dependências **Hexo**. Ao gerar um projeto em **Node.js**, um arquivo chamado **package.json** é criado e nele é registrado todas as informações do projeto, incluindo as dependências. Para instala as dpendências, dê o seguinte comando:
``` bash
$ npm install
```

Pronto, todas as intalações pendentes foram finalizadas. Agora é hora de ver o servidor local do **Hexo** funcionando, digitando:
``` bash
$ hexo serve
```

Após a execução do comando acima, o **Hexo** vai gerar as páginas e iniciar um servidor local. Por padrão, o local é http://localhost:4000/.

Caso a porta já esteja em uso, ou receba  a mensaguem *"listen EADDRINUSE"*, basta executar o seguinte comando :
``` bash
$ hexo serve -p <numero-porta>
```
 * *__numero-porta__* deve ser substituído

O servidor atualiza automaticamente cada edição nos arquivos fonte, caso isto não ocorra, você pode gerar os arquivos estáticos via o comando:
``` bash
$ hexo generate
```

**Pronto! blog gerado, agora é só começar a escrever suas postagens.**

Para saber mais, acesse: [Documentação Hexo](https://hexo.io/pt-br/docs/)
