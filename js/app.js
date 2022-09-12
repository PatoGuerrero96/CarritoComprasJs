const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
cargarEventListeners();

function cargarEventListeners(){
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //eliminar elementos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // btn para vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () =>{ 
        articulosCarrito = []; // resetear arreglo
        limpiarHTML(); // limpiamos html
    })
}

//Funciones

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar Curso
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id');
        // eliminar del arreglo del articuloCarritos por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); // itera sobre el carrito y vuelve a mostrar la informacion limpia del html
    }

}
//Lee el contenido del HTMl al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    console.log(curso);


//crear un objeto con el contenido del curso actual

const infoCurso ={
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad:1
    // Agrega elementos al arreglo del carrito
}


//Revisa si un elemento ya existe
 const existe =articulosCarrito.some(curso => curso.id === infoCurso.id);
 if(existe ){
// actualizamos la cantidad
const curso = articulosCarrito.map( curso =>{
if(curso.id=== infoCurso.id){
    curso.cantidad++;
    return curso; //retorna el objeto actualizado
    
}else{
return curso; // retorna los objetos que no son los duplicados;
}
}  );
 }else{
    articulosCarrito = [...articulosCarrito, infoCurso];
 }


console.log(articulosCarrito);

carritoHTML();

}

// Muesttra el carrito y genera el html / limpia los duplicados
function carritoHTML(){
    
    //LimpiarHTML

    limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach ( curso =>{
        const {imagen, titulo, precio, id, cantidad}= curso;
        const row = document.createElement('tr');
        row.innerHTML= 	`<td> <img src= ${imagen} width ="100" >	</td>`+ 
        "<td>" + titulo +"</td>" +
        `<td> ${precio} </td> `+
        `<td> ${cantidad} </td>
        <td> <a href="#" class="borrar-curso" data-id="${id}" >X  </a> </td>
        `;
        
        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    }) 
}

// Eliminar los cursos del  Tbody

function limpiarHTML(){

    //forma lenta
    // contenedorCarrito.innerHTML ='';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}