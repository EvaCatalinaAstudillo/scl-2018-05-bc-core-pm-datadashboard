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

processCohortData = (options) => {
  let coursesCohortSelect = Object.keys(options.cohort.coursesIndex);
  let userNewArray = computeUsersStats(options.cohortData.users, options.cohortData.progress, coursesCohortSelect);
  userNewArray = filterUsers(userNewArray, options.search);
  userNewArray = sortUsers(userNewArray, options.orderBy, options.orderDirection);
  return userNewArray;
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
 
};
window.computeUsersStats = (users, progress, courses) => {

};
