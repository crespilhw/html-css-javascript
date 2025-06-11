'use strict';

const switcher = document.querySelector('.btn');
switcher.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  const className = document.body.className;
  this.textContent = className.includes('light-theme') ? 'Preto' : 'Branco';
  console.log('current class name: ' + className);
});