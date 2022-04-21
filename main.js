class Player {
  constructor(hp, baseDamage, agi, name) {
    this.hp = hp;
    this.baseDamage = baseDamage;
    this.agi = agi;
    this.name = name;
  }
  slash(enemy) {
    return enemy.hp - 25;
  }
  potion() {
    alert(`Te tomaste una pocion. Te sientes mucho mejor`);
    return this.hp + 15;
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
    return player.hp - 15;
  }
}

function event(player, enemy) {
  let counter = 0;
  while (player.hp >= 0 && enemy.hp >= 0) {
    counter++;
    alert(`Turno ${counter}`);
    turnResolver(player, enemy);
    if (player.hp <= 0) {
      alert("YOU DIED");
      break;
    } else if (enemy.hp <= 0) {
      alert("ENEMY VANQUISHED!");
      break;
    }
  }
}

function turnResolver(player, enemy) {
  let player_ini = player.agi + Math.floor(Math.random() * 10 + 1);
  let enemy_ini = enemy.agi + Math.floor(Math.random() * 10 + 1);
  if (player_ini > enemy_ini) {
    pAttackSelector(player, enemy);
  } else if (enemy_ini > player_ini) {
    player.hp = enemy.bomb(player);
    alert(`Player health ${player.hp}`);
  } else if (enemy_ini === player_ini) {
    alert("Tu y tu enemigo chocan sus armas igualando sus fuerzas!");
  }
}

function pAttackSelector(player, enemy) {
  let option = Number(
    prompt(
      "Seleccione con un numero la habilidad que desea utilizar: (1) Slash (25 de dano) o (2) Pocion (+15 de salud)"
    )
  );
  if (option === 1) {
    enemy.hp = player.slash(enemy);
    alert(`Enemy health ${enemy.hp}`);
    return enemy.hp;
  } else if (option === 2) {
    player.potion();
    alert(`Tu vida ahora es ${player.hp}`);
    return enemy.hp;
  } else {
    alert("Comando desconocido recibido. Aplicando un ataque normal.");
    return enemy.hp - player.baseDamage;
  }
}

let player = new Player(300, 15, 15, "Trafuri");
let enemy = new Enemy(350, 15, 15, "Trafurion");

event(player, enemy);
