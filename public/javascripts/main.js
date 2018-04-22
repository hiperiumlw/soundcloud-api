let cancionActual;

$(document).ready(function () {


    SC.initialize({
        client_id: 'sAoIf2ba0JnODuFmAJmRQrV0TbrmoF8e',
    });
    $('.buscar').click(()=>{
        let autor = $('.form-control').val();
        SC.get('/tracks', {
            q: autor
        }).then(function(tracks) {
            $('.imagenes-busqueda').empty();
            tracks.forEach((cancion)=>{
                console.log(cancion);
                if(cancion.artwork_url != null){
                    $('.imagenes-busqueda').append('<img id="'+cancion.id+'"  class="imagen-buscada" src="'+cancion.artwork_url+'" alt="imagen" draggable="true" ondragstart="drag(event)">');
                } else {
                    $('.imagenes-busqueda').append('<img id="'+cancion.id+'"  class="imagen-buscada" src="'+cancion.user.avatar_url+'" alt="imagen" draggable="true" ondragstart="drag(event)">');
                 }
            })
        });
    })

    $('.play').click(function () {
        if (cancionActual) {
            let time = function(){
                let tiempo = new Date(cancionActual.currentTime());
                $('.currentTime').text("Tiempo Actual-> "+tiempo.getMinutes()+":"+tiempo.getSeconds());
                var barraProgreso = $('#barraProgreso');
                barraProgreso.attr({value:cancionActual.currentTime()});
                barraProgreso.attr({max:cancionActual.getDuration()});
            };
            setInterval(time, 1000);
            if(cancionActual.isPlaying()){
                cancionActual.seek(0);
            } else {
                cancionActual.play().then(function () {
                    console.log('Playback started.');
                }).catch(function (e) {
                    console.error('Playback rejected.', e);
                });
            }
        }
    })

    $('.pause').click(function () {
        if (cancionActual){
            cancionActual.pause();
        }
    })


});

function drag(ev){
    ev.dataTransfer.setData("text",ev.target.id);
    console.log("Se esta moviendo : " + ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    $('.imagen').empty();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    SC.get('/tracks/'+data+'', {
    }).then(function(cancion) {
        $('#titulo-cancion').text(cancion.title);
        let autor = $('.form-control').val()
        $('#autor-cancion').text(autor);
        if (cancion.description!="")
            $('#descripcion-cancion').text(cancion.description);
        else
            $('#descripcion-cancion').text("Descripcion no disponible!");
    });

    SC.stream('/tracks/'+data+'').then(function (cancion) {
        cancionActual = cancion;
    });


}