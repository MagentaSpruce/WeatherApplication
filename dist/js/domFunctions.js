export const addSpinner = (icon) => {
    animateButton(icon);
    setTimeout(animateButton, 1000, icon);
}

const animateButton = icon => {
    icon.classList.toggle('none');
    icon.nextElementSibling.classList.toggle('block');
    icon.nextElementSibling.classList.toggle('none');
}

export const displayError = (headerMsg, srMsg) => {
    updateWeatherLocationHeader(headerMsg);
    updateScreenReaderConfirmation(srMsg);
}

const updateWeatherLocationHeader = message => {
    const h2 = document.getElementById("currentForecast__location");
    h2.textContent = message;
}

const updateScreenReaderConfirmation = message => {
    document.getElementById('confirmation').textContent = message;
}