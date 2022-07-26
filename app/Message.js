export class Message {
    constructor(element) {
        this.element = element;
    }

    setText(message) {
        this.element.innerText = message;

        return this;
    }

    show() {
        this.element.parentNode.style.display = 'block';
    }

    hide() {
        this.element.parentNode.style.display = 'none';
    }
}