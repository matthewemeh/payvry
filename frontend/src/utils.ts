export const togglePassword = (element: React.RefObject<HTMLInputElement>) => {
  const inputElement = element.current;

  if (!inputElement) return;

  const oldType: string = inputElement.type;
  inputElement.type = oldType === 'password' ? 'text' : 'password';
};

export const showAlert = (
  msg: string,
  duration = 4000,
  bgColor = '#181818',
  textColor = '#fff'
) => {
  const alert = document.querySelector('#alert') as HTMLDivElement;

  // show alert only when alert box is initially hidden
  if (alert.style.bottom === '-100px') {
    alert.style.background = bgColor;
    alert.style.color = textColor;
    alert.innerHTML = msg;
    alert.style.bottom = '0px';

    setTimeout(() => {
      alert.style.bottom = '-100px';
    }, duration);
  }
};
