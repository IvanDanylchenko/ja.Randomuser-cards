'use strict';

const options = {
  results: 5,
  page: 1,
  seed: 'pe20212',
};

loadUsers(options);

function loadUsers (options) {
  fetch(
    `https://randomuser.me/api/?results=${options.results}&page=${options.page}&seed=${options.seed}`
  )
    .then(response => response.json())
    .then(({ results }) => {
      console.log('data :>> ', results);
      renderUsers(results);
    })
    .catch(e => {
      console.log('e :>> ', e);
    });
}

const [beginingBtn, prevBtn, nextBtn] = document.querySelectorAll('button');

beginingBtn.addEventListener('click', beginingBtnHandler);
prevBtn.addEventListener('click', prevBtnHandler);
nextBtn.addEventListener('click', nextBtnHandler);

function beginingBtnHandler () {
  options.page = 0;
  loadUsers(options);
}

function prevBtnHandler () {
  if (options.page > 1) {
    options.page -= 1;
    loadUsers(options);
  }
}

function nextBtnHandler () {
  options.page += 1;
  loadUsers(options);
}

function renderUsers (users) {
  const usersList = document.querySelector('.users-list');

  const usersListItems = users.map(u => createUserItem(u));

  usersList.replaceChildren(...usersListItems);
}

function createUserItem ({
  name: { first: firstName, last: lastName },
  picture: { large: src },
  registered: { age: age },
  email,
  gender,
}) {
  const userListItem = document.createElement('li');
  userListItem.classList.add('user-list-item');

  if (gender === 'male') {
    userListItem.classList.add('gender-male');
  } else if (gender === 'female') {
    userListItem.classList.add('gender-female');
  } else {
    userListItem.classList.add('gender-not');
  }

  userListItem.addEventListener('click', function (e) {
    const selection = document.querySelector('.selection');
    const selectionFullName = document.createElement('p');
    if (!e.currentTarget.classList.contains('selection-users')) {
      e.currentTarget.classList.add('selection-users');
      selectionFullName.append(`${firstName} ${lastName}`);
      return selection.append(selectionFullName);
    }
  });

  userListItem.append(
    createUserImg(src, `${firstName} ${lastName}`),
    createUserMainInfo(`${firstName} ${lastName} Age:${age} E-mail:${email}`)
  );

  return userListItem;
}

function createUserImg (src, alt) {
  const userImgEl = document.createElement('img');
  userImgEl.src = src;
  userImgEl.alt = alt;
  userImgEl.onerror = () => {
    userImgEl.src = './img/defaultImg.png';
  };
  return userImgEl;
}

function createUserMainInfo (textContent) {
  const userMainInfoEl = document.createElement('p');
  userMainInfoEl.textContent = textContent;
  return userMainInfoEl;
}
