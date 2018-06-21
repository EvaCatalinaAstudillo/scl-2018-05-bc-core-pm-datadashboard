window.onload = function() {
  requiereJson();
};
async function requiereJson() {
  const jsonUsers = await fetch('../../data/cohorts/lim-2018-03-pre-core-pw/users.json');
  const users = await jsonUsers.json();
  const jsonProgress = await fetch('../../data/cohorts/lim-2018-03-pre-core-pw/progress.json');
  const progress = await jsonProgress.json();
  const jsonCohorts = await fetch('../../data/cohorts.json');
  const cohorts = await jsonCohorts.json();
  // llamando criterios y dejando en pausa paa despues ejecutar.
  showCohortsList(cohorts);
  inputChange(users, progress, cohorts);
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
  console.log(userNewArray);
  return userNewArray;
};
sortUsers = (users, orderBy, orderDirection) => {
}

filterUsers = (users, search) => {
  // aca pongan el codigo

};
computeUsersStats = (users, progress, courses) => {
  for (i = 0; i < users.length; i++) {
    let userId = users[i].id;
    let userProgress = progress[userId];

    if (JSON.stringify(userProgress) === '{}') {
      users[i] = {
        ...users[i],
        stats: {
          percent: 0,
          exercises: { percent: 0, },
          reads: { percent: 0, },
          quizzes: {
            percent: 0,
            scoreAvg: 0,
          }
        }
      };
      continue;
    }
    let readsCompleted = 0, readsTotal = 0, scoreSumQuizz = 0, scoreAvg = 0,
      quizzCompleted = 0, quizzTotal = 0, practiceTotal = 0, practiceCompleted = 0, percent = 0;
    courses.forEach(element => {
      percent = userProgress[element].percent;
      const unitsValues = Object.values(userProgress[element].units);
      unitsValues.forEach(element2 => {
        Object.values(element2.parts).forEach(element3 => {
          if (element3.type === 'read') {
            readsTotal += 1;
            if (element3.completed === 1) {
              readsCompleted += 1;
            }
          }
          if (element3.type === 'quiz') {
            quizzTotal += 1;
            if (element3.completed === 1) {
              quizzCompleted += 1;
              scoreSumQuizz += element3.score;
            }
          }
          if (element3.type === 'practice') {
            practiceTotal += 1;
            if (element3.completed === 1) {
              practiceCompleted += 1;
            }
          }
        }); // cierre de partes forEach
      });// cierre de unitsvalues forEach

      users[i] = {
        ...users[i],
        stats: {
          percent: percent,
          exercises: {
            total: practiceTotal,
            completed: practiceCompleted,
            percent: Math.round((practiceCompleted / practiceTotal) * 100),
          },

          reads: {
            total: readsTotal,
            completed: readsCompleted,
            percent: Math.round((readsCompleted / readsTotal) * 100),
          },
          quizzes: {
            total: quizzTotal,
            completed: quizzCompleted,
            percent: Math.round((quizzCompleted / quizzTotal) * 100),
            scoreSum: scoreSumQuizz,
            scoreAvg: Math.round(scoreSumQuizz / quizzCompleted),
          }
        }
      };
    });
    // cierre de cursos 
  }
  // console.log(users);
  return users;
  // --micodigo
};
