window.onload = function () {
  requiereJson();
};
async function requiereJson() {
  const jsonUsers = await fetch('../../data/cohorts/lim-2018-03-pre-core-pw/users.json');
  const users = await jsonUsers.json();
  const jsonProgress = await fetch('../../data/cohorts/lim-2018-03-pre-core-pw/progress.json');
  const progress = await jsonProgress.json();
  const jsonCohorts = await fetch('../../data/cohorts.json');
  const cohorts = await jsonCohorts.json();

  showCohortsList(cohorts);
  inputChange(users, progress, cohorts);
}

inputChange = (users, progress, cohorts) => {
  let searchString = '';
  let findCohort = '';
  let filter = '';
  let direcction = '';

  //Escuchar eventos del dom y llamar la funcion cada vez que se cambie el filtro
  document.getElementById('cohortsInput').addEventListener('change', function () {
    let cohortSelect = document.getElementById('cohortsInput').value;
    findCohort = cohorts.find(item => item.id === cohortSelect);
    printData(processCohortData(createObjectOptions()));
  });
  document.getElementById('searchButtom').addEventListener('click', function () {
    searchString = document.getElementById('searchInput').value;
    printData(processCohortData(createObjectOptions()));
  });
  document.getElementById('filterButtom').addEventListener('click', function () {
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
sortUsers = (users, orderBy, orderDirection) => {
//aca pongan el codigo
};
filterUsers = (users, search) => {
users.filter(function(search){ 
//element es equivalente al objeto. 
//la función retorna objetos que contengan el nombre buscado.
}); return (search.name == filter);
};

computeUsersStats = (users, progress, courses) => {
 //aca pongan el codigo
}