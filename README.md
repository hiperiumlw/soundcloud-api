---
## Utilización de la propiedad Drag&Drop
>Vamos a crear nuestro propio reproductor de SoundCloud, para ello vamos a utilizar la potencia de la api de SoundCloud para buscar canciones y reproducirlas, el reproductor base nos mostrará un formulario donde nos solictará el artista a buscar, y nos mostrará un listado de caractulas en miniatura de los resultados, estos podrán ser arrastrados  aún contenedor que mostrará la carátula en grande y pondrá en marcha la música.

### Condiciones
Debemos crear una cuenta en SoundClud para obtener un ClientId para poder acceder a la API, para ello una vez registrados y logueados en la plataforma ponemos en marcha cualquier reproductor de soundCloud abrimos las herramientas de desarrollo y buscamos el siguiente link https://api.soundcloud.com/tsub/subscribe?registrationID=  al final dispondremos de un parametro denominada client_id y lo copiamos es nuestro id de cliente.
Disponéis de las referencias al SDK de SoundCloud:
https://developers.soundcloud.com/docs/api/sdks

De los cuales y más importantes son:
Inicializaión de SoundCloud en:

```javascript
SC.initialize({
	client_id: [client-id]
});
```
Para la búsqueda de canciones por autor
```javascript
SC.get('/tracks',{
	q:autor}).then(function(tracks){
  \\Aquí realizamos todo el proceso de dibujo en pantalla de las caratulas.
 }
 ```
 Para obtener informacion de la canción y poner en marcha el reproductor
 ```javascript
 SC.stream('/tracks/'+id).then(function(player){
			//console.log('canción' + JSON.stringify(player));
			player.play();
		}).catch(function(error){
			alert('Error :'+error.message);
		});
  ```
  A partir de estas especificaciones podéis investigar y añadir nuevas funcionalidades.
 
