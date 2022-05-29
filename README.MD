# ApiREST NodeJS & MongoDB & Express V 2.0

Aplicacion practica de un CRUD desplegada en NodeJS, MongoDB, usando Express y Babel

<p align="center">
<a href="https://github.com/rquintg"><img src="https://miro.medium.com/max/1400/1*M10QaO1mZCk_jvH2EBNmaQ.jpeg" style="width:600px !important; height:300px !important" alt="node express mongoDB"></a>
</p>

## Tabla de contenido
1. [Info General](#Tabla-de-contenido)
2. [Pre-requisitos](#Pre-requisitos-)
3. [Instalacion](#Instalación-)
4. [Ejecucion de la API](#Ejecutando-la-API-)
5. [Despliegue](#Despliegue-)

## Comenzando 🚀

_Recordemos que solo esta desplegado el Backend, el Front esta en proceso_

Mira **Dkdir** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_Frameworks y dependencies que necesitas_
s
```
- [NodeJS](https://nodejs.org/es/download/)
- [MongoDB](https://cloud.mongodb.com/)
- [express](https://expressjs.com/es/)
- [mongoose](https://mongoosejs.com/)
```

### Instalación 🔧

_Paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose_

_Consola_

```
$ gh repo clone rquintg/taskAPI
$ cd ../path/to/the/file
$ npm install
$ npm start

```


## Ejecutando la API ⚙️

_Consola_
```
$ npm run dev  #iniciamos en modo DEV con babel
or
$ npm run build  # para ejecutar babel
$ npm start # desplegamos en modo producion
```

### Analice las pruebas end-to-end 🔩

Se debe de usar la extencion [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)


```
En la carpeta request estan las peticiones HTTP para usar los metodos GET, POST, UPDATE, DELETE, etc.
```


## Despliegue 📦

_Consola_
```
$ npm run build  # para ejecutar babel
$ npm start # desplegamos en modo producion
```