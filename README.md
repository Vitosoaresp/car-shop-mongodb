# Car Shop :car:

# Contexto
Este projeto trata-se de uma API CRUD (create, read, uptade, delete) utilizando paradigma da programação orientada a objetos - POO.

## Rotas

> GET

```
/cars
/cars/:id
```

> POST

```
/cars
```
  <details>
    <summary>
      <strong>O corpo da requição deve conter:</strong>
    </summary>
    
    
    status?: boolean | undefined;
    model: string;
    year: number;
    color: string;
    buyValue: number;
    doorsQty: number;
    seatsQty: number;
    
  </details>
  
> PUT

```
/cars/:id
```
  <details>
    <summary>
      <strong>O corpo da requição deve conter:</strong>
    </summary>
    
    
    status?: boolean | undefined;
    model: string;
    year: number;
    color: string;
    buyValue: number;
    doorsQty: number;
    seatsQty: number;
    
  </details>
  
> DELETE

```
/cars/:id
```

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MongoDB, [Mongoose](https://mongoosejs.com/), TypeScript, Mocha & Chai e [Zod](https://zod.dev/)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)



## Instalando Dependências

```bash
cd car-shop-mongodb/ 
npm install
``` 

## Executando aplicação

> Para rodar a aplicação é necessario ter o [Docker](https://www.docker.com/)

  ```
  docker-compose up -d
  ```
 ![image](https://user-images.githubusercontent.com/23152592/199629979-ffe0edba-e5cf-465e-bf0d-0d517a73daa9.png)


## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
  ```
