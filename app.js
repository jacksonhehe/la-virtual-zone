// Router y vistas simples
function $(id){ return document.getElementById(id); }

function renderNav(){
  const nav = $('main-nav');
  nav.innerHTML = '';
  const left = document.createElement('div');
  left.innerHTML = `<a href="#/">La Virtual Zone</a>`;
  const right = document.createElement('div');
  if(state.session){
    right.innerHTML = `Hola, ${state.session.username} | <a href="#/logout">Salir</a>`;
    if(state.session.role==='DT') right.innerHTML += ` | <a href="#/dt">Club</a>`;
    if(state.session.role==='ADMIN') right.innerHTML += ` | <a href="#/admin">Admin</a>`;
  } else {
    right.innerHTML = `<a href="#/login">Login</a> | <a href="#/register">Registro</a>`;
  }
  nav.appendChild(left); nav.appendChild(right);
}

function router(){
  const hash = location.hash.slice(1) || '/';
  const [path, param] = hash.split('/').filter(Boolean);
  const main = $('app');
  main.innerHTML='';
  switch(path){
    case undefined:
      renderHome(main); break;
    case 'login': renderLogin(main); break;
    case 'register': renderRegister(main); break;
    case 'logout': state.session=null; saveState(state); renderNav(); location.hash='/'; break;
    case 'blog': param ? renderPost(main,param) : renderBlog(main); break;
    case 'store': renderStore(main); break;
    case 'dt': requireRole('DT') ? renderDT(main) : render403(main); break;
    case 'admin': requireRole('ADMIN') ? renderAdmin(main) : render403(main); break;
    default: render404(main); break;
  }
}

window.addEventListener('hashchange', router);

function requireRole(role){
  return state.session && state.session.role===role;
}

// Vistas
function renderHome(root){
  document.title = 'Inicio - La Virtual Zone';
  const feed = document.createElement('div');
  feed.innerHTML = '<h1>Noticias</h1>';
  state.posts.forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML=`<h3>${p.title}</h3><p>${p.excerpt}</p><a href="#/blog/${p.slug}">Leer</a>`;
    feed.appendChild(card);
  });
  root.appendChild(feed);
}

function renderLogin(root){
  document.title='Login - LVZ';
  const form = document.createElement('form');
  form.innerHTML=`<h2>Login</h2>
  <input name="username" placeholder="Usuario" required />
  <input name="password" type="password" placeholder="Contraseña" required />
  <button class="btn">Entrar</button>`;
  form.onsubmit = e=>{
    e.preventDefault();
    const {username,password} = e.target;
    const user = state.users.find(u=>u.username===username.value && u.password===password.value);
    if(!user){ alert('Credenciales inválidas'); return; }
    state.session = {id:user.id, username:user.username, role:user.role, clubId:user.clubId};
    saveState(state); renderNav(); location.hash='/';
  };
  root.appendChild(form);
}

function renderRegister(root){
  document.title='Registro - LVZ';
  const form = document.createElement('form');
  form.innerHTML=`<h2>Registro</h2>
    <input name="username" placeholder="Usuario" required />
    <input name="email" placeholder="Email" type="email" required />
    <input name="password" type="password" placeholder="Contraseña" required />
    <button class="btn">Crear</button>`;
  form.onsubmit=e=>{
    e.preventDefault();
    const {username,email,password}=e.target;
    const id = state.users.length+1;
    state.users.push({id, username:username.value, email:email.value, role:'USER', avatar:'', clubId:null, password:password.value});
    saveState(state);
    alert('Registrado, ahora puedes iniciar sesión');
    location.hash='/login';
  };
  root.appendChild(form);
}

function renderBlog(root){
  document.title='Blog - LVZ';
  root.innerHTML='<h1>Blog</h1>';
  state.posts.forEach(p=>{
    const card=document.createElement('div'); card.className='card';
    card.innerHTML=`<h3>${p.title}</h3><p>${p.excerpt}</p><a href="#/blog/${p.slug}">Leer</a>`;
    root.appendChild(card);
  });
}

function renderPost(root, slug){
  const post = state.posts.find(p=>p.slug===slug);
  if(!post){ render404(root); return; }
  document.title=post.title+' - LVZ';
  root.innerHTML=`<h1>${post.title}</h1><p>${post.content}</p>`;
}

function renderStore(root){
  document.title='Tienda - LVZ';
  root.innerHTML='<h1>Tienda</h1>';
  state.store.items.forEach(item=>{
    const card=document.createElement('div'); card.className='card';
    card.innerHTML=`<strong>${item.name}</strong><p>${item.price} monedas</p>`;
    if(state.session){
      const btn=document.createElement('button'); btn.className='btn'; btn.textContent='Comprar';
      btn.onclick=()=>{
        state.store.purchases.push({id:Date.now(), userId:state.session.id, itemId:item.id});
        saveState(state); alert('Compra realizada');
      };
      card.appendChild(btn);
    }
    root.appendChild(card);
  });
}

function renderDT(root){
  document.title='Club - LVZ';
  const club = state.clubs.find(c=>c.id===state.session.clubId);
  const players = state.players.filter(p=>p.clubId===club.id);
  root.innerHTML=`<h1>${club.name}</h1>`;
  const table=document.createElement('table'); table.className='table';
  table.innerHTML='<tr><th>#</th><th>Nombre</th><th>Posición</th><th>OVR</th><th>Acción</th></tr>';
  players.forEach(pl=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${pl.number}</td><td>${pl.name}</td><td>${pl.position}</td><td>${pl.overall}</td><td><button class="btn" data-id="${pl.id}">Editar</button></td>`;
    table.appendChild(tr);
  });
  table.addEventListener('click',e=>{
    if(e.target.matches('button[data-id]')){
      const id=e.target.getAttribute('data-id');
      openPlayerModal(id);
    }
  });
  root.appendChild(table);
}

function openPlayerModal(id){
  const player=state.players.find(p=>p.id==id);
  const modal=$('modal-root');
  modal.className='modal';
  modal.innerHTML=`<div class="modal-content"><h3>Editar ${player.name}</h3>
    <label>Número</label><input id="pl-number" value="${player.number}" />
    <label>Salario</label><input id="pl-salary" value="${player.salary}" />
    <label>Fin de contrato</label><input id="pl-contract" value="${player.contractEnd}" />
    <button class="btn" id="save-player">Guardar</button>
    <button class="btn secondary" id="close-modal">Cerrar</button></div>`;
  $('close-modal').onclick=()=>{modal.className='hidden';};
  $('save-player').onclick=()=>{
    player.number=parseInt($('pl-number').value);
    player.salary=parseInt($('pl-salary').value);
    player.contractEnd=$('pl-contract').value;
    saveState(state);
    modal.className='hidden'; router();
  };
}

function renderAdmin(root){
  document.title='Admin - LVZ';
  root.innerHTML='<h1>Panel Admin</h1>';
  const dash=document.createElement('div'); dash.className='card';
  dash.innerHTML=`Usuarios: ${state.users.length} | Clubes: ${state.clubs.length} | Jugadores: ${state.players.length}`;
  root.appendChild(dash);
  const market=document.createElement('div'); market.className='card';
  const btn=document.createElement('button'); btn.className='btn';
  btn.textContent=state.marketOpen?'Cerrar mercado':'Abrir mercado';
  btn.onclick=()=>{state.marketOpen=!state.marketOpen; saveState(state); router();};
  market.appendChild(btn); root.appendChild(market);
  const exportBtn=document.createElement('button'); exportBtn.className='btn'; exportBtn.textContent='Exportar Estado';
  exportBtn.onclick=()=>{
    const data=JSON.stringify(state,null,2);
    alert(data);
  };
  root.appendChild(exportBtn);
}

function render403(root){
  document.title='403 - LVZ';
  root.innerHTML='<h1>403 Prohibido</h1>';
}
function render404(root){
  document.title='404 - LVZ';
  root.innerHTML='<h1>404 No encontrado</h1>';
}

renderNav();
router();
