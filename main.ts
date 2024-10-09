//API rest: Programa que tiene endpoints, que atiende peticiones a traves del protocolo HTTPS

//Endpoint: Tiene Ruta: www.web.com/usuarios, metodo: PUT, GET, POST, DELETE, payload:

//En el json, poner un -A, para los permisos

const usuarios = [
  { //De objeto a texto, usamos JSON.stringify
  nombre: "Pablo",
  mail: "ppp@mail.com",
  edad: 23
},
{
  nombre: "Alex",
  mail: "aaa@mail.com",
  edad: 20
},
{
  nombre: "Gonza",
  mail: "ggg@mail.com",
  edad: 23
},
{
  nombre: "Alex",
  mail: "amo@mail.com",
  edad: 21
},
{
  nombre: "Alex",
  mail: "amovej@mail.com",
  edad: 20
}
]


function handle(req:Request):Response { //Darme una respuesta en funcion de la ruta, con parametro de busqueda
  const url = new URL(req.url) //Asi se la ruta
  const path = url.pathname;//Saco la ruta
  const searchparams = url.searchParams; //Con esto saco los parametros de busqueda que se separan con un ?, como /users?nombre=Pablo
  if(path==="/usuarios"){
    if(searchparams.get("nombre") && searchparams.get("edad")){
      const nameS = searchparams.get("nombre")
      const edadS = searchparams.get("edad")
      let edadN = 0
              if(edadS){
                  edadN = parseInt(edadS,10)
              }
      const usr = usuarios.filter((elem) => elem.nombre === nameS).filter((elem) => elem.edad === edadN) 
      return new Response(JSON.stringify(usr))
    } else if(searchparams.get("nombre")){ // comprobar si hay parametro de busqueda
        const nameS = searchparams.get("nombre")
        const usr = usuarios.filter((elem) => elem.nombre === nameS)
        return new Response(JSON.stringify(usr))
    } else if (searchparams.get("edad")){
        const edadS = searchparams.get("edad")
        let edadN = 0
              if(edadS){
                  edadN = parseInt(edadS,10)
              }
        const usr = usuarios.filter((elem) => elem.edad === edadN)
        return new Response(JSON.stringify(usr))
      } 
    return new Response(JSON.stringify(usuarios))
  }
  return new Response(`La ruta ${path} no existe`, {status: 404})//Devuelvo el hiost y la ruta
}



/*
function handle(req:Request):Response { //Darme una respuesta en funcion de la ruta, lo q devueve la funcion debe de ser texto
  const url = new URL(req.url) //Asi se la ruta
  const path = url.pathname;//Saco la ruta
  if(path==="/usuarios"){
    return new Response(JSON.stringify(usuarios))
  } else if (path === "/usuarios/Pablo"){
    const usuario = usuarios.find((elem) => elem.nombre === "Pablo")
    if (usuario){
      return new Response(JSON.stringify(usuario))
    } else {
      return new Response(`No se encontro el usuario`)
    }
    
  } else if (path === "/usuarios/Alex"){
    const usuario = usuarios.find((elem) => elem.nombre === "Alex")
    if (usuario){
      return new Response(JSON.stringify(usuario))
    } else {
      return new Response(`No se encontro el usuario`)
    }
  }
  return new Response(`La ruta ${path} no existe`, {status: 404})//Devuelvo el hiost y la ruta
}
*/

/*
function handle(req:Request):Response { //Darme una respuesta
  const url = new URL(req.url) //Asi se la ruta
  console.log(`La url es: ${url.host}`)//Muestro el host
  const path = url.pathname;//Saco la ruta
  return new Response(`${url.host} -- ${path}`)//Devuelvo el hiost y la ruta
}
*/


/*
function handle(req:Request):Response { //Darme una respuesta
  creturn new Response("Hola mundo xd")
}
*/
Deno.serve({port:1234}, handle); //Funcion serve, puerto en el q escucha y la funcion q procesa lo q le llega