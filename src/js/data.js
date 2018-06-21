window.onload = function() {
  requiereJson();
};
async function requiereJson() {
  try {
    const jsonUsers = await fetch('../../data/cohorts/lim-2018-03-pre-core-pw/users.json');
    const users = await jsonUsers.json();
    const jsonProgress = await fetch('../../data/cohorts/lim-2018-03-pre-core-pw/progress.json');
    const progress = await jsonProgress.json();
    const jsonCohorts = await fetch('../../data/cohorts.json');
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

  if ("document" in window) {
    // Escuchar eventos del dom y llamar la funcion cada vez que se cambie el filtro
    document.getElementById('cohortsInput').addEventListener('change', function() {
      let cohortSelect = document.getElementById('cohortsInput').value;
      findCohort = cohorts.find(item => item.id === cohortSelect);
      printData(processCohortData(createObjectOptions()));
    });
    document.getElementById('searchButtom').addEventListener('click', function() {
      searchString = document.getElementById('searchInput').value;
      printData(processCohortData(createObjectOptions()));
    });
    document.getElementById('filterButtom').addEventListener('click', function() {
      filter = document.getElementById('filterInput').value;
      direcction = document.filterForm.direction.value;
      printData(processCohortData(createObjectOptions()));
    });
  }
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

window.computeUsersStats = (users, progress, courses) => {
  // Variables de estadisticas de cohort en general
  let completitudTotalSum = 0, percentLecturasSum = 0,
    percentQuizzSum = 0, percentExercisesSum = 0, completitudTotal = 0, percentLecturas = 0, percentQuizzes = 0, percentExercises = 0;

  
      // console.log(users[i].name + " " + quizzTotal + " completadas" + quizzCompleted + "porcentaje" + users[i].stats.quizzes.percent + scoreSumQuizz);
      percentLecturasSum += users[i].stats.reads.percent;
      percentQuizzSum += users[i].stats.quizzes.percent;
      percentExercisesSum += users[i].stats.exercises.percent;
    
  }
  // Estadisticas de todo el cohort
  completitudTotal = Math.round(completitudTotalSum / users.length) + ' % ';
  percentLecturas = Math.round(percentLecturasSum / users.length) + ' % ';
  percentQuizzes = Math.round(percentQuizzSum / users.length) + ' % ';
  percentExercises = Math.round(percentExercisesSum / users.length) + ' % ';

  if("document" in window){
    let totalSpan = document.getElementById('total');
    console.log(totalSpan)
    totalSpan.innerText = completitudTotal;
    let lecturasSpan = document.getElementById('lecturas');
    lecturasSpan.innerText = percentLecturas;
    let quizzesSpan = document.getElementById('quizzes');
    quizzesSpan.innerText = percentQuizzes;
    let exercisesSpan = document.getElementById('ejercicios');
    exercisesSpan.innerText = percentExercises;
  }
  return users;
};

window.sortUsers = (users, orderBy, orderDirection) => {
  let sorted = users;

  if (orderBy === 'Nombre') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((one, two) => one.name.localeCompare(two.name));
    }
    if (orderDirection === 'DESC') {
      sorted = users.sort((one, two) => one.name.localeCompare(two.name) * -1);
    }
  }

  if (orderBy === 'Porcentaje de completitud total') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((one, two) => one.stats.percent - two.stats.percent);
    }
    if (orderDirection === 'DESC') {
      sorted = (users.sort((one, two) => one.stats.percent - two.stats.percent)).reverse();
    }
  }

  if (orderBy === 'Porcentaje de ejercicios autocorregidos completados') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((one, two) => one.stats.exercises.percent - two.stats.exercises.percent);
    }
    if (orderDirection === 'DESC') {
      sorted = (users.sort((one, two) => one.stats.exercises.percent - two.stats.exercises.percent)).reverse();
    }
  }
  if (orderBy === 'Porcentaje de quizzes completados') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((one, two) => one.stats.quizzes.percent - two.stats.quizzes.percent);
    }
    if (orderDirection === 'DESC') {
      sorted = (users.sort((one, two) => one.stats.quizzes.percent - two.stats.quizzes.percent)).reverse();
    }
  }
  if (orderBy === 'Puntuación promedio en quizzes completados') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((one, two) => one.stats.quizzes.scoreAvg - two.stats.quizzes.scoreAvg);
    }
    if (orderDirection === 'DESC') {
      sorted = (users.sort((one, two) => one.stats.quizzes.scoreAvg - two.stats.quizzes.scoreAvg)).reverse();
    }
  }
  if (orderBy === 'Porcentaje de lecturas completadas') {
    if (orderDirection === 'ASC') {
      sorted = users.sort((one, two) => one.stats.reads.percent - two.stats.reads.percent);
    }
    if (orderDirection === 'DESC') {
      sorted = (users.sort((one, two) => one.stats.reads.percent - two.stats.reads.percent)).reverse();
    }
  }
  return sorted;
};
window.filterUsers = (users, search) => {
  if (search === '') {
    return users;
  }
  const usersFilter = users.filter((elemento) => {
    return elemento.name === search;
  });
  return usersFilter;
};
processCohortData = (options) => {
  let coursesCohortSelect = Object.keys(options.cohort.coursesIndex);
  let userNewArray = window.computeUsersStats(options.cohortData.users, options.cohortData.progress, coursesCohortSelect);
  userNewArray = window.filterUsers(userNewArray, options.search);
  userNewArray = window.sortUsers(userNewArray, options.orderBy, options.orderDirection);
  return userNewArray;
};