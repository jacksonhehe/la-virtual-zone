export const STORAGE_KEY = 'lvz_state_v1';

const baseState = {
  session: null,
  marketOpen: true,
  users: [
    { id: 1, username: 'admin', email: 'admin@lvz.es', role: 'ADMIN', avatar: '', clubId: null, password: 'admin' },
    { id: 2, username: 'dt', email: 'dt@lvz.es', role: 'DT', avatar: '', clubId: 1, password: 'dt' },
    { id: 3, username: 'user1', email: 'user1@lvz.es', role: 'USER', avatar: '', clubId: null, password: 'user1' },
    { id: 4, username: 'user2', email: 'user2@lvz.es', role: 'USER', avatar: '', clubId: null, password: 'user2' }
  ],
  clubs: [
    { id:1, name:'Dragons FC', managerId:2, budget:1000000 },
    { id:2, name:'Phoenix United', managerId:null, budget:1200000 },
    { id:3, name:'Wolves SC', managerId:null, budget:900000 },
    { id:4, name:'Tigers FC', managerId:null, budget:950000 },
    { id:5, name:'Sharks', managerId:null, budget:1100000 },
    { id:6, name:'Lions', managerId:null, budget:800000 },
    { id:7, name:'Eagles', managerId:null, budget:1050000 },
    { id:8, name:'Bulls', managerId:null, budget:990000 }
  ],
  players: [],
  offers: [
    { id:1, playerId:1, fromClubId:1, toClubId:2, amount:1200000, status:'accepted', date:'2024-06-01' },
    { id:2, playerId:2, fromClubId:2, toClubId:3, amount:800000, status:'pending', date:'2024-06-05' },
    { id:3, playerId:3, fromClubId:3, toClubId:4, amount:500000, status:'accepted', date:'2024-06-15' }
  ],
  tournaments: [
    { id:1, name:'Copa Apertura', status:'active', participants:[1,2,3,4], fixture:[], rules:'Todos contra todos' },
    { id:2, name:'Supercopa', status:'registration', participants:[5,6,7,8], fixture:[], rules:'Eliminación directa' }
  ],
  matches: [
    { id:1, torneoId:1, localId:1, visitanteId:2, date:'2024-08-10T18:00:00', estadio:'Dragons Arena', result:null },
    { id:2, torneoId:1, localId:3, visitanteId:4, date:'2024-08-12T20:00:00', estadio:'Wolf Park', result:null },
    { id:3, torneoId:1, localId:2, visitanteId:1, date:'2024-07-01T18:00:00', estadio:'Dragons Arena', result:{local:1, visitante:2} },
    { id:4, torneoId:1, localId:4, visitanteId:3, date:'2024-07-02T20:00:00', estadio:'Tiger Stadium', result:{local:0, visitante:0} }
  ],
  posts: [
    { id:1, title:'Bienvenida a La Virtual Zone', slug:'bienvenida', excerpt:'Arranca la liga.', content:'Contenido demo', tags:['anuncio'], date:'2024-06-01' },
    { id:2, title:'Mercado de pases', slug:'mercado-pases', excerpt:'Rumores y fichajes', content:'Contenido demo', tags:['mercado'], date:'2024-06-10' },
    { id:3, title:'Fixture confirmado', slug:'fixture-confirmado', excerpt:'Calendario publicado', content:'Contenido demo', tags:['torneo'], date:'2024-06-20' }
  ],
  store: {
    items: [
      { id:1, name:'Camiseta Edición Limitada', price:500 },
      { id:2, name:'Balón Oficial', price:300 },
      { id:3, name:'Pack de Monedas', price:200 },
      { id:4, name:'Sticker Pack', price:50 }
    ],
    purchases: [
      { id:1, userId:3, itemId:1 },
      { id:2, userId:4, itemId:4 }
    ]
  },
  comments: [],
  finances: {}
};

function generatePlayers() {
  let id = 1;
  const positions = ['POR','DEF','MED','DEL'];
  baseState.clubs.forEach(club => {
    for(let i=0;i<18;i++) {
      const pos = positions[Math.floor(Math.random()*positions.length)];
      baseState.players.push({
        id:id,
        clubId:club.id,
        name:`Jugador ${id}`,
        number:i+1,
        position:pos,
        overall:70+Math.floor(Math.random()*20),
        age:18+Math.floor(Math.random()*15),
        salary:500+Math.floor(Math.random()*500),
        contractEnd:'2026-06-30'
      });
      id++;
    }
  });
}

generatePlayers();

export default baseState;
