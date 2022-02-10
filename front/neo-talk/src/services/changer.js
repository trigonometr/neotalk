export function changeElem(elemClass, setter, settings) {
  const divElem = document.getElementsByClassName(elemClass)[0];
  divElem.style.borderColor = settings.color;
  setter(settings.style);
}
