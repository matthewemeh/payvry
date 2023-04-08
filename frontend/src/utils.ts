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

export const toggleClass = (el: Element, ...classes: string[]) => {
  classes.forEach(className => el.classList.toggle(className));
};

export const addClass = (el: Element, ...classes: string[]) => {
  classes.forEach(className => el.classList.add(className));
};

export const removeClass = (el: Element, ...classes: string[]) => {
  classes.forEach(className => el.classList.remove(className));
};

export const showInfo = (classTarget?: string, yPos?: number, xPos?: number) => {
  const infoBubbles = document.querySelectorAll('.info-bubble');
  const infoBubblesContainer = document.querySelector('.info-bubbles-container') as HTMLDivElement;

  // close all info bubbles...
  infoBubbles.forEach(infoBubble => {
    addClass(infoBubble, 'hidden');
  });
  addClass(infoBubblesContainer, 'hidden');

  if (!classTarget) return;

  const currentInfoBubble = document.querySelector(classTarget) as HTMLDivElement;
  if (!currentInfoBubble) return;

  // ...then reveal chosen info bubble...
  toggleClass(currentInfoBubble, 'hidden');

  if (xPos) {
    currentInfoBubble.style.left = `${xPos}px`;
  }

  if (yPos) {
    currentInfoBubble.style.top = `${yPos}px`;
  }

  // ...afterwards block-off interaction with other elements
  removeClass(infoBubblesContainer, 'hidden');
};
