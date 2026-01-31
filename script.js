const habitInput = document.getElementById('habitInput');
const addBtn = document.getElementById('addBtn');
const habitList = document.getElementById('habitList');
const totalHabitsEl = document.getElementById('totalHabits');
const completedHabitsEl = document.getElementById('completedHabits');
const streakEl = document.getElementById('streak');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveHabits(){ localStorage.setItem('habits', JSON.stringify(habits)); }

function renderHabits(){
  habitList.innerHTML = '';
  let completedCount = 0;
  habits.forEach((habit,index)=>{
    const li = document.createElement('li');
    li.textContent = habit.text;
    if(habit.completed){ li.classList.add('completed'); completedCount++; }

    li.style.opacity = 0;
    setTimeout(()=>{ li.style.opacity=1; li.style.transition='opacity 0.5s'; },10);

    li.addEventListener('click',()=>{ 
      habits[index].completed=!habits[index].completed; 
      saveHabits(); 
      renderHabits(); 
    });

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
    delBtn.addEventListener('click',(e)=>{ 
      e.stopPropagation(); 
      habits.splice(index,1); 
      saveHabits(); 
      renderHabits(); 
    });

    li.appendChild(delBtn);
    habitList.appendChild(li);
  });

  totalHabitsEl.textContent = habits.length;
  completedHabitsEl.textContent = completedCount;
  streakEl.textContent = habits.length>0 ? habits.length-completedCount : 0;
}

addBtn.addEventListener('click',()=>{
  const text = habitInput.value.trim();
  if(text){ habits.push({text,completed:false}); saveHabits(); renderHabits(); habitInput.value=''; }
});

habitInput.addEventListener('keypress',(e)=>{ if(e.key==='Enter') addBtn.click(); });

renderHabits();
