window.onload = function() {
  requiereJson();
};
async function requiereJson() {
  try {
    const jsonUsers = await fetch('https://estephanyc.github.io/scl-2018-05-bc-core-pm-datadashboard/data/cohorts/lim-2018-03-pre-core-pw/users.json');
    const users = await jsonUsers.json();
    const jsonProgress = await fetch('https://estephanyc.github.io/scl-2018-05-bc-core-pm-datadashboard/data/cohorts/lim-2018-03-pre-core-pw/progress.json');
    const progress = await jsonProgress.json();
    const jsonCohorts = await fetch('https://estephanyc.github.io/scl-2018-05-bc-core-pm-datadashboard/data/cohorts.json');
    const cohorts = await jsonCohorts.json();

    showCohortsList(cohorts);
    inputChange(users, progress, cohorts);
  } catch (err) {
    alert('no se pudierón cargar los datos' + err);
  }
}
inputChange = (users, progress, cohorts) => {
  let searchString = '';
  let findCohort = '';
  let filter = '';
  let direcction = '';

  // Escuchar eventos del dom y llamar la funcion cada vez que se cambie el filtro
  document.getElementById('cohortsInput').addEventListener('change', function() {
    document.getElementById('filter-Students').classList.add('visibility');
    document.getElementById('stats').classList.add('visibility');
    let cohortSelect = document.getElementById('cohortsInput').value;
    findCohort = cohorts.find(item => item.id === cohortSelect);
    printData(processCohortData(createObjectOptions()));
  });
  document.getElementById('searchButtom').addEventListener('click', function() {
    searchString = document.getElementById('searchInput').value;
    document.getElementById('searchInput').value = '';
    printData(processCohortData(createObjectOptions()));
  });
  document.getElementById('filterButtom').addEventListener('click', function() {
    filter = document.getElementById('filterInput').value;
    direcction = document.filterForm.direction.value;
    printData(processCohortData(createObjectOptions()));
  });

  createObjectOptions = () => {
    const options = {
      cohort: findCohort,
      cohortData: {
        users: users,
        progress: progress,
      },
      orderBy: filter,
      orderDirection: direcction,
      search: searchString
    };
    return options;
  };
};

showCohortsList = (cohorts) => {
  const cohortsId = cohorts.map(cohort => cohort.id);
  const cohortList = document.getElementById('cohortsInput');
  cohortsId.forEach(function(item) {
    const option = document.createElement('option');
    option.innerText = item;
    cohortList.appendChild(option);
  });
};
printData = (users) => {
  document.getElementById('students').innerText = '';

  // Variables de estadisticas de cohort en general
  let completitudTotalSum = 0, percentLecturasSum = 0,
    percentQuizzSum = 0, percentExercisesSum = 0;
  
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
      if (text === users[i].name) {
        newElement.classList.add('col-12');
      }
      newElement.innerText = text;
      newElement.classList.add(clase);
      newElement.classList.add('center');
      newElement.classList.add('col-2');
      parent.appendChild(newElement);
    }
    completitudTotalSum += users[i].stats.percent;
    percentLecturasSum += users[i].stats.reads.percent;
    percentQuizzSum += users[i].stats.quizzes.percent;
    percentExercisesSum += users[i].stats.exercises.percent;
  }

  // imprimir estadisticas de todo el cohort
  let completitudTotal = Math.round(completitudTotalSum / users.length),
    percentLecturas = Math.round(percentLecturasSum / users.length),
    percentQuizzes = Math.round(percentQuizzSum / users.length),
    percentExercises = Math.round(percentExercisesSum / users.length) ;

  let totalSpan = document.getElementById('total');
  totalSpan.innerText = completitudTotal + ' % ';

  let lecturasSpan = document.getElementById('lecturas');
  lecturasSpan.innerText = percentLecturas + ' % ';

  let quizzesSpan = document.getElementById('quizzes');
  quizzesSpan.innerText = percentQuizzes + ' % ';

  let exercisesSpan = document.getElementById('ejercicios');
  exercisesSpan.innerText = percentExercises + ' % ';

  let prueba = 100 / users.length;
  console.log(prueba * completitudTotalSum);
};
