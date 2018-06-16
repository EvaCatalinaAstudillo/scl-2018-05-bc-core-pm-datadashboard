showCohortsList = (cohorts) =>{
  const cohortsId = cohorts.map(cohort => cohort.id);
  const cohortList = document.getElementById('listas');

  cohortsId.forEach(function(item) {
    let option = document.createElement('option');
    option.value = item;
    cohortList.appendChild(option);
  });
}
printData = (users) =>{
  document.getElementById('students').innerText = '';
  for (let i = 0; i < users.length; i++) {
    const userList = document.getElementById('students');
    let newStudent = document.createElement('div');

    if (i % 2 === 0)
    {
      newStudent.classList.add('studentOne');
    }
    else
    {
      newStudent.classList.add('studentTwo');
    }
    userList.appendChild(newStudent);
    createElement(newStudent, 'h4', users[i].name, 'col-4');
    createElement(newStudent, 'h4', users[i].stats.percent, 'col-2');
    createElement(newStudent, 'h4', users[i].stats.reads.total, 'col-2');
    createElement(newStudent, 'h4', users[i].stats.exercises.total, 'col-2');
    createElement(newStudent, 'h4', users[i].stats.quizzes.total, 'col-2');

    function createElement(parent, element, text, clase) {
      let newElement = document.createElement(element);
      newElement.innerText = text;
      parent.appendChild(newElement);
    } 
  }
};

