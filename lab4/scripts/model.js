class CalculatorModel {
  constructor() {
    this.clear();
  }

  clear() {
    this.operand1 = "";
    this.operand2 = "";
    this.operator = null;
    this.displayValue = "0";
    this.lastResult = null;
    this.error = false;
  }

  inputDigit(digit) {
    if (this.error) return;

    if (this.operator === null) {
      if (this.lastResult !== null && this.operand1 === "") {
        this.lastResult = null;
      }
      this.operand1 = this._appendDigit(this.operand1, digit);
      this.displayValue = this.operand1;
    } else {
      this.operand2 = this._appendDigit(this.operand2, digit);
      this.displayValue = this.operand2;
    }
  }

  inputOperator(operator) {
    if (this.error) return;

    if (this.operand1 === "") {
      this.operand1 = "0";
    }

    if (this.operator && this.operand2 !== "") {
      const result = this.calculate();
      if (this.error) return;
      this.operand1 = result.toString();
      this.operand2 = "";
      this.displayValue = this.operand1;
    }

    this.operator = operator;
  }

  calculate() {
    if (this.error) return null;
    if (this.operand1 === "") return null;

    const a = parseFloat(this.operand1);
    const b = this.operand2 === "" ? a : parseFloat(this.operand2);
    let result;

    switch (this.operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        if (b === 0) {
          this.error = true;
          this.displayValue = "Eroare: împărțire la zero";
          return null;
        }
        result = a / b;
        break;
      default:
        return null;
    }

    if (!Number.isFinite(result) || Number.isNaN(result)) {
      this.error = true;
      this.displayValue = "Eroare: rezultat invalid";
      return null;
    }

    this.lastResult = result;
    this.displayValue = result.toString();
    return result;
  }

  makeExpression() {
    if (this.operator === null) return this.operand1 || "0";
    if (this.operand2 === "") return `${this.operand1} ${this.operator}`;
    return `${this.operand1} ${this.operator} ${this.operand2}`;
  }

  _appendDigit(currentValue, digit) {
    if (digit === ".") {
      if (currentValue.includes(".")) return currentValue;
      return currentValue === "" ? "0." : currentValue + ".";
    }
    if (currentValue === "0") {
      return digit;
    }
    return currentValue + digit;
  }
}
