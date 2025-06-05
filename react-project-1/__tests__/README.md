Para instalar o Jest em um projeto React com TypeScript, execute:

```sh
npm install --save-dev jest @types/jest ts-jest
```

Para projetos com React, também é recomendado instalar:

```sh
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

Depois, inicialize a configuração do Jest:

```sh
npx ts-jest config:init
```

Isso criará um arquivo `jest.config.js` básico para TypeScript.

Agora, você pode rodar os testes com:

```sh
npm test
```

Para rodar o teste de um arquivo específico com Jest, use:

```sh
npx jest __tests__/MovieCard.test.tsx
```

Ou, se estiver usando npm script:

```sh
npm test -- __tests__/MovieCard.test.tsx
```

Você também pode usar parte do nome do arquivo:

```sh
npx jest MovieCard
```
