export class LogEntry {

    textSkeletton = "";
    values = [];
    textExpression = /\{[0-9]+\}/g;

    constructor(text) {
        this.textSkeletton = text;
    }

    add(value, wrapWith = null, withClass = "") {

        if (wrapWith) {
            value = "<" + wrapWith + " class='" + withClass + "'>" + value + "</" + wrapWith + ">";
        }

        this.values.push(value);
    }

    render() {
        let exp = new RegExp(this.textExpression);
        let index = 0;
        let renderedText = this.textSkeletton;

        while (placeHolder = exp.exec(this.textSkeletton)) {
            if (this.values[index]) {
                renderedText = renderedText.replace(placeHolder[0], this.values[index]);
            }
            index++;
        }
        return renderedText;
    }
}