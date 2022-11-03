const socket = io()

/* Escuchando al Servidor */
socket.on('Notas', data => {
    render(data)
})
socket.on('NotasCliente', data => {
    render(data)
    /* alert(data) */
})

function render(data){
    const html = data.map((elem, index) =>{
            return (
                `<div>
                    <strong>${elem.denominacion}</strong>:
                    <p>${elem.contenido}</p>
                 <div>
                `
            )
        }
    ).join(" ")
    document.getElementById('notas').innerHTML = html
}

