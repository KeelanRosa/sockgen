import './style.css';

function component() {
    const element = document.createElement('h1');
    element.innerHTML = "Sock Generator";
    return element;
}

document.body.appendChild(component());