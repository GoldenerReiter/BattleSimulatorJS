"use strict"

class Warrior {
  constructor(hp, baseDamage, agi, name) {
    this.hp = hp;
    this.baseDamage = baseDamage;
    this.agi = agi;
    this.name = name;
  }
  slash(enemy) {
    return enemy.hp - (this.baseDamage + 5);
  }
  berserk(enemy) {
    this.hp -= 10;
    this.agi += 1;
    return enemy.hp - (this.baseDamage + 15);
  }
}

class Archer {
  constructor(hp, baseDamage, agi, name) {
    this.hp = hp;
    this.baseDamage = baseDamage;
    this.agi = agi;
    this.name = name;
  }
  Golden_Arrow(enemy) {
    return enemy.hp - (this.baseDamage + 5);
  }
  potion() {
    this.hp += 35;
    this.agi -= 1;;
  }
}

class Enemy {
  constructor(hp, baseDamage, agi, name) {
    this.hp = hp;
    this.baseDamage = baseDamage;
    this.agi = agi;
    this.name = name;
  }
  bomb(player) {
    return player.hp - this.baseDamage;
  }
}

function charCreator(arr) {
  let option = Number(prompt('Inserte su opcion aqui: 1. Crear Guerrero - 2. Crear Arquero.'));
  if (option === 1) {
    let player = new Warrior(300, 15, 15, prompt('Inserte el nombre de su guerrero:'));
    player.name.toLowerCase();
    arr.push(player);
    console.log(arr);
    menu()
  } else if (option === 2) {
    let player = new Archer(300, 15, 15, prompt('Inserte el nombre de su arquero:'));
    player.name.toLowerCase();
    arr.push(player);
    console.log(arr);
    menu()
  }
}

function charSelector(arr) {
  let heroName = prompt('Inserte el nombre del personaje que desea utilizar.');
  heroName.toLowerCase();
  if (arr.length >= 1) { 
    let found = arr.find(hero => hero.name == heroName);
    console.log(found);
    return found;
  } else if (arr.length == 0) {
    alert('No hay personajes para jugar, por favor cree uno e intente de nuevo.');
    menu();
  }
  
}

function combat(player, enemy, arr) {
  let counter = 0;
  while (player.hp >= 0 && enemy.hp >= 0) {
    counter++;
    alert(`Turno ${counter}`);
    turnResolver(player, enemy);
    if (player.hp <= 0) {
      alert("YOU DIED");
      player_heroes = arr.filter(alive => alive !== player);  // Eliminar personaje con vida igual o menor a 0.
      console.log(player_heroes);
      let option = Number(prompt('Continar? 1 Si - 2 No'));
      if (option == 1) {
        if (player_heroes.length == 0) {
          alert('No tienes suficientes personajes vivos para jugar.');
          return;
        };
        combat(charSelector(player_heroes), enemy, player_heroes);
      } else if (option == 2) {
        alert("Seleccionaste no continuar, o no tienes suficientes persoanjes vivos para continuar.")
        return;
      } else {
        return;
      };
    } else if (enemy.hp <= 0) {
      alert("ENEMY VANQUISHED!");
      return;
    }
  } return;
}

function turnResolver(player, enemy) {
  let player_ini = player.agi + Math.floor(Math.random() * 10 + 1);
  let enemy_ini = enemy.agi + Math.floor(Math.random() * 10 + 1);
  if (player_ini > enemy_ini) {
    pAttackSelector(player, enemy);
    alert(`Enemy health ${enemy.hp}`);
  } else if (enemy_ini > player_ini) {
    player.hp = enemy.bomb(player);
    alert(`Player health ${player.hp}`);
  } else if (enemy_ini === player_ini) {
    alert("Tu y tu enemigo chocan sus armas igualando sus fuerzas!");
  }
}

function pAttackSelector(player, enemy) {
  if (player instanceof Archer) {
    let option = Number(prompt('Inserte el ataque que desea aplicar: 1. Flecha dorada - 2. Pocion'))
    if (option === 1) {
      enemy.hp = player.Golden_Arrow(enemy);
    } else if (option === 2) {  
      player.potion();      
    }
  } else if (player instanceof Warrior) {
    let option = Number(prompt('Inserte el ataque que desea aplicar: 1. Slash - 2. Berserk'))
    if (option === 1) {
      enemy.hp = player.slash(enemy);
    } else if (option === 2) {  
      enemy.hp = player.berserk(enemy);     
    }
  }
}


function menu() {
  let option = Number(prompt('Inserte su opcion: 1. Crear personaje - 2. Combate - 3. Salir.'));
  switch (option) {
    case 1:
      charCreator(player_heroes);
      menu();
    case 2:
      combat(charSelector(player_heroes), enemy, player_heroes);
    case 3:
      return;
  } return;
}

let enemy = new Enemy(350, 50, 15, "Trafurion");

let player_heroes = new Array();

menu(player_heroes, enemy);
