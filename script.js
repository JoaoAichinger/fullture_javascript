const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const sessionInfo = document.getElementById('session-info');
const durationSelect = document.getElementById('duration');


let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentDay = new Date().getDay();

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
      const dateStr = date.toISOString().split('T')[0];
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('day');

      const p = document.createElement('p');
      p.textContent = day;
      dayDiv.appendChild(p);

      //adiciona bolinha no dia de hoje
      
      if(compareDay(day, month, year)){
        const toDay = document.createElement('img');
        toDay.classList.add('dayDot');
        toDay.src = "./assets/bolinha.svg";
        dayDiv.appendChild(toDay);
      }
      
  
  
      dayDiv.addEventListener('click', () => {
        document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
        dayDiv.classList.add('selected');
        showSessionInfo(dateStr);
      });
  
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
  

renderCalendar(currentMonth, currentYear);