___
# Indice
```table-of-contents
```
___

# 1. HTML, etiquetas y atributos

El lenguaje HTML (Hiper Text Markup Language) es un lenguaje de marcas que se utiliza para describir las páginas web. Al contrario que otros lenguajes, HTML es un lenguaje **interpretado**, es decir, su código es interpretado línea a línea por los visores o navegadores web, y no es compilado.

## 1.1 Estructura de un documento HTML

Los documentos HTML se encuentran estrictamente organizados. Cada parte del documento se debe declarar utilizando unas etiquetas específicas.

La estructura básica es la siguiente:

```html
<!DOCTYPE html>
<html lang="es">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Título de la página</title>
	</head>
	<body>
		<!-- Aqui va el resto del código -->
	</body>
</html>
```

1. La declaración `<!DOCTYPE html>` ayudará al navegador a visualizar la página correctamente.

2. La etiqueta `<html>` es la raíz del documento y envuelve todo el código. 

	También está la etiqueta `<head>` que define la cabecera del documento. Dentro de esta etiqueta vendrán definidas las siguientes:
	 - El titulo del documento: `<title></title>`
	 - Enlaces a hojas de estilo: `<link rel="STYLESHEET" type="text/css" href="style.css">`
	 - Las etiquetas `<meta>` o meta-etiquetas, utilizadas para describir el documento y sus propiedades.
	
	Los tipos de meta-etiquetas mas utilizados son:
	
	|      TIPO      | SIGNIFICADO                                          | 
	|:--------------:| ---------------------------------------------------- |
	|     author     | Autor de la página                                   |
	|   generator    | programa utilizado para crear la página              |
	| classification | Palabras para clasificar la página en los buscadores |
	|  description   | Descripción del contenido de la página               |
	|    keywords    | Palabras claves de la página                         |
	
	Podemos usar también el atributo `http-equiv` en la etiqueta `<meta>` para indicarle al navegador que realice alguna acción al cargar la página. Por ejemplo, si se desea actualizar la página cada 20 segundos, podemos usar la siguiente etiqueta:
	
	```html
	<meta http-equiv="Refresh" content="20">
	```
	
	Una función útil de esto es redireccionar al usuario que ingrese en una web antigua, consiguiéndolo de la siguiente forma:
	
	```html
	<meta http-equiv="Refresh" content="3;URL=http://www.nuevapagina.es">
	```
	
	Esto hará una redirección a la URL escrita a los 3 segundos.

3. La etiqueta `<body>` que representa la estructura del cuerpo de la página. Si hay texto plano en esta etiqueta, se mostrará en la parte visible de la página web.

___

## 1.2 Normas de HTML

HTML cuenta con normas o recomendaciones que sugieren cómo se deben escribir los documentos para que el navegador pueda interpretarlos. Algunas consideraciones importantes son:
- Los documentos HTML son documentos estructurados y organizados.
- Los nombres de los elementos o etiquetas no son sensibles a mayúsculas (case sensitive).
- Los nombres de los atributos no son sensibles a mayúsculas.
- Los valores de los atributos son sensibles a mayúsculas, sobre todo los que hacen referencia a nombres de archivos.
- Los nombres de las etiquetas no deben contener espacios en blanco.
- Los valores de los atributos deberán ir entre comillas si contienen espacios en blancos o caracteres que no son alfanuméricos.
- HTML asume cualquier secuencia de espacios en blanco como un único carácter, a menos que estén dentro de una etiqueta `<PRE>` de preformateado especial.
- Las etiquetas que encierran contenido deben cerrarse.
- Las etiquetas pueden anidarse.
- Los exploradores omiten elementos desconocidos, tanto etiquetas como atributos.

___

## 1.3 Etiquetas para formateo de texto

