showCohortsList = (cohorts) => {
  const cohortsId = cohorts.map(cohort => cohort.id);
  const cohortList = document.getElementById('listas');
  cohortsId.forEach(function(item) {
    const option = document.createElement('option');
    option.value = item;
    cohortList.appendChild(option);
  });
};
printData = (users) => {
  document.getElementById('students').innerText = '';
  for (let i = 0; i < users.length; i++) {
    const userList = document.getElementById('students');
    const newStudent = document.createElement('div');
    newStudent.classList.add('col-md-12');

    // para que sea una linea gris y una blanca
    if (i % 2 === 0) {
      newStudent.classList.add('studentOne');
    } else {
      newStudent.classList.add('studentTwo');
    }
    userList.appendChild(newStudent);
    createElement(newStudent, 'h4', users[i].name, 'col-md-2');
    createElement(newStudent, 'h4', users[i].stats.percent + ' % ', 'col-md-2');
    createElement(newStudent, 'h4', users[i].stats.exercises.percent + ' % ', 'col-md-2');
    createElement(newStudent, 'h4', users[i].stats.quizzes.scoreAvg, 'col-md-2');
    createElement(newStudent, 'h4', users[i].stats.quizzes.percent + ' % ', 'col-md-2');
    createElement(newStudent, 'h4', users[i].stats.reads.percent + ' % ', 'col-md-2');

    function createElement(parent, element, text, clase) {
      const newElement = document.createElement(element);
      newElement.innerText = text;
      newElement.classList.add(clase);
      newElement.classList.add('center');
      parent.appendChild(newElement);
    }
  }
};

/*
window.showStatsCohort = (completitudTotal, percentLecturas, percentQuizzes, percentExercises) => {
  let totalSpan = document.getElementById('total');
  // console.log(completitudTotal);
  // console.log(totalSpan);
  totalSpan.innerText = completitudTotal;
  let lecturasSpan = document.getElementById('lecturas');
  lecturasSpan.innerText = percentLecturas;
  let quizzesSpan = document.getElementById('quizzes');
  quizzesSpan.innerText = percentQuizzes;
  let exercisesSpan = document.getElementById('ejercicios');
  exercisesSpan.innerText = percentExercises;
};
*/
