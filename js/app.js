// Declarar un array que represetará los asientos del avión con false indicando que estos están vacíos
// Asiento ocupado = true

var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

// Contador que ayudará a rastrear el número de sientos ocupados
var busySeats = 0;

var paintSeats = function(array) {
  var containerSeats = document.getElementById('seats');

  for (var i = 0; i < array.length; i++) {
    var seat = document.createElement('div');
    seat.className = 'seats';

    // Del primer elemento al cuarto: Serán los asientos de Primera Clase y corresponde del indice 0 al 3
    if (i < 4) {
      seat.style.backgroundColor = '#b6fce4';
    } else {
      seat.style.backgroundColor = '#ffd5a4';
    }
    containerSeats.appendChild(seat);
  }
};

var reserve = function() {
  var btn = document.getElementById('btn');
  btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
  var choice = prompt(
    'En que zona prefiere reservar: \n 1. Primera Clase \n 2. Clase Económica \n \n Por favor, ingrese el número de su preferencia'
  );
  if (choice == 1) {
    checkFirstClassZone();
  } else if (choice == 2) {
    checkEconomicZone();
  } else {
    alert('Por favor ingresa un número válido')
  }
};

var checkFirstClassZone = function() {
  var zone = 'Primera Clase';
  // Recorre del elemento 0 al 3 y verifica cuales están disponibles
  for (var index = 0; index < 4; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeat(index);
      paintTicket(index, zone);
      busySeats++;
      // Al reservar un asiento, no se necesita seguir recorriendo el arreglo
      // Se rompe el for con break
      break;
    } else if (index == 3 && airlineSeats[index] == true) {
      reasignEconomicZone(zone);
    }
  }
};

var checkEconomicZone = function() {
  var zone = 'Clase Económica';
  // Recorre del elemento 4 al 9 y verifica cuales están disponibles
  for (var index = 4; index < 10; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeat(index);
      paintTicket(index, zone);
      busySeats++;
      // Al reservar un asiento, no se necesita seguir recorriendo el arreglo
      // Se rompe el for con break
      break;
    } else if (index == 9 && airlineSeats[index] == true) {
      reasignFirstClassZone(zone);
    }
  }
};

var reserveSeat = function(indexToPaint) {
  var seat = document.getElementsByClassName('seats');
  seat[indexToPaint].textContent = 'Ocupado';
};

var reasignEconomicZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm(
      'No quedan asientos disponibles en ' + 
      zone +
      ' :( \n Quiere reservar en zona económica?'
    );

    if (reasign == true) {
      checkEconomicZone();
    } else {
      nextFlight();
    }
  }
};

var reasignFirstClassZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm(
      'No quedan asientos disponiles en ' + 
      zone +
      ' :( \n Quiere reservar en Primera Clase?'
    );
    
    if (reasign == true) {
      checkFirstClassZone();
    } else {
      nextFlight();
    }
  }
};

var paintTicket = function(index, zone) {
  var containerTickets = document.getElementById('tickets');
  var ticket = document.createElement('div');
  ticket.className = 'seats'; // Clase CSS - se puede renombrar por otro
  var title = document.createElement('p');
  var reservedSeating = document.createElement('p');
  var zoneClass = document.createElement('p');
  title.textContent = 'PASE DE ABORDAR';
  reservedSeating.textContent = 'No. de asiento: ' + (index + 1);
  zoneClass.textContent = zone;  
  ticket.appendChild(title);
  ticket.appendChild(reservedSeating);
  ticket.appendChild(zoneClass);
  containerTickets.appendChild(ticket);
};

var nextFlight = function() {
  alert('El próximo vuelo sale en 3 horas!');
};

var noSeats = function() {
  alert('Lo sentimos. \n No quedan asientos disponibles en este vuelo')
};

paintSeats(airlineSeats);
reserve();