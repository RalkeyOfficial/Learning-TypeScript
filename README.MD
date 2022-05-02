# Learning TypeScript

in this repo i keep all my projects i made while learning typescript

i used Typescript and snowpack for these projects

## what is snowpack and why did i use it?

[Snowpack](https://www.snowpack.dev/) is a bundler which bundles your npm packages and javascript together

this is to save you alot of time and so you can use npm packages on your website instead of backend only

## installing typescript (without snowpack)
###### not recommend for projects that require node packages

first of all install typeScript globally with:

`npm install -g typescript` inside your terminal

(only have to run once on your pc)

---


once you have made the project run: 

`npm --init` to create the package.json file

`tsc --init --module esnext --outdir ./dist --rootdir ./src` 

to create a .tsconfig file which has the configuration with my prefered settings for the compiler.

without my prefered settings:

`tsc --init`

---

run:

`tsc --watch`

to watch for any changes inside .ts files and compile them

or create a script inside the package.json file to use `tsc --watch` once you type "npm start" in the terminal

```json
"scripts": {
  "start": "tsc --watch",
}
```

## installing typescript (with snowpack)

open the project folder and inside the terminal type:

`npx create-snowpack-app . --template @snowpack/app-template-blank-typescript --force`

to create the snowpack project

### note: 

running this command will also install node packages and files you may not want. such as:

- canvas-confetti (node package)
- @types/canvas-confetti (node package)
- prettier (node package)
- public/favicon.ico (file)
- public/logo.svg (file)
- .prettierrc (file)

---

to start developmen, type `npm start` in the terminal to open a live server and start compiling .ts files

---

to build the website type `npm run build` in the terminal

this will create a seperate folder called "build" with all the files needed in your website

