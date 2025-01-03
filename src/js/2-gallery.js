const formData = { email: '', message: '' };
const keyFormDataLS = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

(function fillFormFromLS() {
  try {
    if (localStorage.length === 0) {
      return;
    }

    const dataFormFromLS = JSON.parse(localStorage.getItem(keyFormDataLS));

    for (let key in dataFormFromLS) {
      const value = dataFormFromLS[key];
      if (value) {
        formEl.elements[key].value = value;
        formData[key] = value;
      }
    }
  } catch (err) {
    console.log(err);
  }
})();

const saveDataFormToLS = e => {
  const formField = e.target;
  formData[formField.name] = formField.value;

  localStorage.setItem(keyFormDataLS, JSON.stringify(formData));
};

const isFielsdNonEmpty = obj => Object.values(obj).every(el => el.length > 0);
const clearDataFormLS = e => {
  e.preventDefault();
  if (isFielsdNonEmpty(formData)) {
    const formEl = e.currentTarget;
    formEl.reset();
    console.log(formData);
    Object.keys(formData).forEach(key => delete formData[key]);
    localStorage.removeItem(keyFormDataLS);
  } else {
    console.log('Fill please all fields');
  }
};

formEl.addEventListener('input', saveDataFormToLS);
formEl.addEventListener('submit', clearDataFormLS);
