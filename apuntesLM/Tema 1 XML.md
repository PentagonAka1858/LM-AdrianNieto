___
```table-of-contents
```
___
# Introducción a XML

XML (eXtensible Markup Language, Lenguaje de Marcado eXtensible) es un lenguaje desarrollado por W3C (World Wide Web Consortium) que está basado en SGML (Standard Generalized Markup Language, Lenguaje de Marcado Generalizado Estándar).

XML es un lenguaje utilizado para el almacenamiento e intercambio de datos estructurados entre distintas plataformas.

XML es un metalenguaje, es decir, puede ser empleado para definir otros lenguajes, llamados dialectos XML. Ejemplos de estos son **GML, MathML, RSS...**
___
# 1. Elementos

Los documentos XML están formado por texto plano y marcas (etiquetas). Es recomendable que el nombre de estas marcas sea lo mas descriptiva posible, y se deben escribir entre los símbolos "<" y ">", y al cerrar la marca, que tenga también "/":

```xml
<nombre>Elsa</nombre>
```

La sintaxis básica es la siguiente:

```xml
<marca>valor</marca>
```

## 1.1 Elementos vacíos

Un documento XML puede contener elementos vacíos, es decir, marcas sin valor. Para crearlo, deberíamos escribir lo siguiente:

```xml
<marca></marca>
```

También se podrá expresar con lo siguiente:

```xml
<marca/>
```

## 1.2 Relaciones entre elementos

Un elemento puede contener a otro u otros elementos. A continuación mostraremos un ejemplo que mostrará los datos de una persona:
```xml
<persona>
	<nombre>Elsa</nombre>
	<mujer/>
	<fecha_nacimiento>
		<dia>17</dia>
		<mes>6</mes>
		<año>1996</año>
	</fecha_nacimiento>
	<ciudad>Pamplona</ciudad>
</persona>
```

En este ejemplo, el elemento persona tiene 4 elementos: nombre, mujer, fecha_nacimiento y ciudad. A su vez, fecha_nacimiento tiene otros 3 elementos: dia, mes y año.

## 1.3 Elemento raíz

**Todo documento XML debe tener un elemento raíz**, del que descienden el resto de elementos. En el ejemplo anterior, este elemento raíz sería persona, es decir, el resto de elementos del documento descienden de este. Por lo tanto, **un documento XML siempre es posible representarlo como un árbol invertido de elementos.**

## 1.4 Elementos con contenido mixto

Un elemento puede contener una mezcla de marcas y texto plano, como el siguiente ejemplo:

```xml
<persona>
	<nombre>Elsa</nombre> vive en <ciudad>Pamplona</ciudad>
</persona>
```

En este ejemplo, el elemento persona tendría contenido mixto, ya que contiene los elementos "nombre" y "ciudad" y el texto plano "vive en".
___

# 2. Normas de sintaxis básica

En XML, todos los nombres de las etiquetas son *case sensitive*, es decir, son capaces de diferenciar entre mayúsculas y minúsculas. Esto provoca que las etiquetas deban cumplir las siguientes normas:
 
 - Pueden contener letras, números, puntos ".", guiones "-" y guiones bajos "_".
 - Se puede usar el carácter dos puntos ":" pero su uso se reserva para cuando definan espacios de nombres.
 - El primer carácter debe ser una letra o un guión bajo "_".

___

# 3. Atributos en XML

Un elemento de XML puede tener atributos definidos en la etiqueta de inicio. **Esta etiqueta sirve para proporcionar información adicional sobre el elemento que lo contiene**.

Por ejemplo, dada la siguiente lista, crearemos un documento XML:

 - Código: G45
 - Nombre: Gorro de lana
 - Color: negro
 - Precio: 12.65

```xml
<producto codigo="G45">
	<nombre color="negro" precio="12.65">Gorro de lana</nombre>
</producto>
```

En este ejemplo, `color`, `codigo` y `precio` son atributos. El valor de los atributos puede ir entre comillas dobles `"` o comillas simples `'`.

Además, los atributos deben cumplir las mismas normas que las etiquetas, además de que un atributo debe ser único en cada elemento.

___

# 4. Declaración XML

Para declarar un archivo XML, deberemos usar los caracteres `<?` y `?>` al igual que las instrucciones de procesamiento.

## 4.1 Atributos version y encoding

Con estos atributos dentro de la declaración XML se le indican la versión y la codificación usada. De forma predeterminada se suele dar un valor de `version="1.0"` y de `encoding="UTF-8"`. Esta declaración XML debe aparecer en la primera línea del documento. Un ejemplo podría ser el siguiente:

```xml
<?xml version="1.0" enconding="UTF-8"?>
<persona>
	<nombre>Elsa</nombre>
</persona>
```

___

# 5. Instrucciones de procesamiento

En un documento XML, **una instrucción de procesamiento sirve para indicar cierta información al programa que procese dicho documento.** Las instrucciones de proceso se escriben empezando con la pareja de caracteres `<?` y `?>`.

Suele usarse para asociar un archivo css a un documento XML. Un ejemplo sería:

```xml
<?xml-stylesheet type="text/css" href="estilo.css"?>
```

Este archivo usaría *estilo.css* como archivo css para darle un estilo.