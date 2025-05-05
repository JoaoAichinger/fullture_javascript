// Classe de Reuniões
class Meet {
    constructor(duration, time) {
      this.duration = duration;
      this.time = time;
    }
  }
  
  // Classe do dia
  class Day {
    constructor(date) {
      this.date = date;
      this.meetings = [];
    }
  
    addMeeting(meeting) {
      this.meetings.push(meeting);
    }
  }
  
  // Armazenamento otimizado
  const days = new Map();
  
  // Elementos
  const calendar = document.getElementById('calendar');
  const monthYear = document.getElementById('monthYear');
  const sessionInfo = document.getElementById('session-info');
  const durationSelect = document.getElementById('duration');
  
  // Estado atual
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  
  function compareDay(d, m, y) {
    const today = new Date();
    return (
      today.getDate() === d &&
      today.getMonth() === m &&
      today.getFullYear() === y
    );
  }
  
  // Função principal de renderização
  function renderCalendar(month, year) {
    calendar.innerHTML = '';
    sessionInfo.innerHTML = ''; // limpa sessão ao mudar de mês
  
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Cabeçalho
    monthYear.textContent = new Date(year, month).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  
    // Preenche espaços antes do 1º dia do mês
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('noDay');
      calendar.appendChild(emptyCell);
    }
  
    // Cria dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('day');
  
      // Número do dia
      const p = document.createElement('p');
      p.classList.add('numDay');
      p.textContent = day;
      dayDiv.appendChild(p);
  
      // Pontinho se for hoje
      if (compareDay(day, month, year)) {
        const toDay = document.createElement('div');
        toDay.classList.add('dayDot');
        dayDiv.appendChild(toDay);
      }
  
      // Marca como "booked" se tiver reunião
      if (days.has(dateStr)) {
        dayDiv.classList.add('booked');
      }
  
      // Evento de clique
      dayDiv.addEventListener('click', () => {
        document.querySelectorAll('.day').forEach(d => d.classList.remove('clicked'));
        dayDiv.classList.add('clicked');
        showSessionInfo(dateStr);
      });
  
      calendar.appendChild(dayDiv);
    }
  }
  
  // Avança mês
  function nextMonth() {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    renderCalendar(currentMonth, currentYear);
  }
  
  // Volta mês
  function prevMonth() {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
  }
  
  // Gera reservas falsas para teste
  function setBooking(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    for (let i = 0; i < 2; i++) {
      const randDay = Math.floor(Math.random() * daysInMonth) + 1;
      const date = new Date(year, month, randDay);
      const dateStr = date.toISOString().split('T')[0];
  
      if (!days.has(dateStr)) {
        const dayObj = new Day(date);
        dayObj.addMeeting(new Meet(60, '08:00'));
        days.set(dateStr, dayObj);
      } else {
        days.get(dateStr).addMeeting(new Meet(60, '08:00'));
      }
    }
  }
  
  // Exibe as reuniões do dia clicado
  function showSessionInfo(dateStr) {
    sessionInfo.innerHTML = '';
  
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  
    const title = document.createElement('h3');
    title.classList.add('session-title');
    title.textContent = formattedDate;
    sessionInfo.appendChild(title);
  
    const container = document.createElement('div');
    container.classList.add('meeting-time');
  
    if (!days.has(dateStr)) {
      container.innerHTML = `<p>No meeting for this day.</p>`;
      sessionInfo.appendChild(container);
      return;
    }
  
    const meetings = days.get(dateStr).meetings;
    meetings.forEach(meeting => {
        const [hourStr, minute] = meeting.time.split(':');
        const hour = parseInt(hourStr, 10);
        const period = hour < 12 ? 'am' : 'pm';
        const displayHour = hour % 12 === 0 ? 12 : hour % 12; // transforma 0 ou 13~23 para 12h formato

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('meeting-hour');
    timeDiv.textContent = `${displayHour}:${minute} ${period}`;
    container.appendChild(timeDiv);
    });
  
    sessionInfo.appendChild(container);
  }
  

  
  // Inicialização
  renderCalendar(currentMonth, currentYear);
  setBooking(currentMonth, currentYear);
  renderCalendar(currentMonth, currentYear); // renderiza com reuniões
  