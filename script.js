//Classe de Reuniões
class Meet{
  
  constructor(duration, time){
    this.duration = duration;
    this.time = time;
  }
}

//Classe do dia
class Day{

  constructor(date){
    this.meetings = [];
    this.dayName = date.getDay();
    this.day = date.getDate()
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }

  addMeeting(meeting){
    this.meetings.push(meeting);
  }
}

const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const sessionInfo = document.getElementById('session-info');
const durationSelect = document.getElementById('duration');


let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentDay = new Date().getDay();

let days = [];



function compareDay(d,m,y){
  const today = new Date();

  return(
    today.getDate() === d && today.getMonth() === m && today.getFullYear() === y
  );
}

function renderCalendar(month, year) {
    calendar.innerHTML = '';
    sessionInfo.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    monthYear.textContent = new Date(year, month).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('noDay')
      calendar.appendChild(emptyCell);
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);

      days.push(new Day(date));

      const dateStr = date.toISOString().split('T')[0];
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('day');

      const p = document.createElement('p');
      p.classList.add('numDay');
      p.textContent = day;
      dayDiv.appendChild(p);

      //adiciona bolinha no dia de hoje
      
      if(compareDay(day, month, year)){
        console.log("Hoje é: ", day, month, year);
        const toDay = document.createElement('div');
        toDay.classList.add('dayDot');
        dayDiv.appendChild(toDay);
      }
      
  
  /*
      dayDiv.addEventListener('click', () => {
        document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
        dayDiv.classList.add('selected');
        showSessionInfo(dateStr);
      });
  */
      calendar.appendChild(dayDiv);
    }
}


function nextMonth(){
  
  if(currentMonth === 11){
    currentYear += 1;
    currentMonth = 0;
  }else{
    currentMonth += 1;
  }
  renderCalendar(currentMonth, currentYear);
}

function prevMonth(){
  
  if(currentMonth === 0){
    currentYear -= 1;
    currentMonth = 11;
  }else{
    currentMonth -= 1;
  }
  renderCalendar(currentMonth, currentYear);
}

//Função para gerar agendamentos aleatórios
function setBooking(month, year){
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dias = document.querySelectorAll('.day')
  for(let i = 0; i < 2; i++){

    const rand = Math.floor(Math.random() * daysInMonth) + 1;

    //adiciona reunião ao dia salvo na lista
    days[rand+1].addMeeting(new Meet(60, '8:00'));

    dias.forEach(dia => {
      const p = dia.querySelector('p');
      if(parseInt(p.textContent) === rand){
        dia.classList.add('booked');
      }
    })

  }
}
  

renderCalendar(currentMonth, currentYear);
setBooking(currentMonth, currentYear);


//gerando orientação de clicks
let divs = document.querySelectorAll('.day');

//função para mostrar agenda


divs.forEach(div =>{
    div.onclick = () => {
      divs.forEach(d => d.classList.remove('clicked'));
      div.classList.add('clicked');
    }
})