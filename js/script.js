Date.prototype.getFormattedForUSA = function () {
  let hours = this.getHours();
  let minutes = this.getMinutes();
  let seconds = this.getSeconds();
  let suffix = '';

  hours < 12 ? (suffix = 'AM') : (hours -= 12);
  suffix = 'PM';

  return (
    midnight(hours) +
    ':' +
    addZero(minutes) +
    ':' +
    addZero(seconds) +
    ' ' +
    suffix
  );

  function midnight(i) {
    if (i === 0) return 12;
  }

  function addZero(i) {
    if (i < 10) i = '0' + i;
    return i;
  }
};

class Clock {
  constructor(elementHandler, typeOfFormat) {
    this.elementHandler = elementHandler;
    this.actualDate = new Date();
    this.typeOfFormat = typeOfFormat;
  }

  start() {
    let self = this;
    this.updateElementContent(this.typeOfFormat);
    setInterval(function () {
      self.addSecond(), self.updateElementContent(self.typeOfFormat);
    }, 1000);
  }

  addSecond() {
    this.actualDate = new Date();
  }

  updateElementContent(typeOfFormat) {
    switch (typeOfFormat) {
      case 'local':
        this.elementHandler.innerHTML = this.actualDate.toLocaleTimeString();
        break;
      case 'USA':
        this.elementHandler.innerHTML = this.actualDate.getFormattedForUSA();
        break;
      default:
        this.elementHandler.innerHTML = this.actualDate.toLocaleTimeString();
    }
  }
}

window.onload = function () {
  const info1 = document.getElementById('time1');
  const info2 = document.getElementById('time2');

  const time1 = new Clock(info1, 'USA');
  time1.start();
  const time2 = new Clock(info2);
  time2.start();
};
