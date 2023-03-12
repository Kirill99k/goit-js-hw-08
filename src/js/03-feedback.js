import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', handleFormSubmit);
refs.form.addEventListener('input', throttle(handleFormInput, 500));

function handleFormSubmit(event) {
  event.preventDefault();
  event.target.reset();

  const {
    elements: { email, message },
  } = event.target;

  if (email.value === '' || message.value === '') {
    return alert('Please complete all required fields');
  }

  localStorage.removeItem(STORAGE_KEY);
}

function handleFormInput(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

saveInputs();

function saveInputs() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    formData = JSON.parse(savedData);

    const entries = Object.entries(formData);

    entries.forEach(([key, value]) => {
      refs.form.elements[key].value = value;
    });

    console.log(entries);
  }
}
