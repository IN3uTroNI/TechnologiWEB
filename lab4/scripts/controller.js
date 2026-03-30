class CalculatorController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindButtonClick(this.handleButtonPress.bind(this));
    this.updateView();
  }

  handleButtonPress(action, value) {
    if (!action) return;

    if (action === "digit") {
      this.model.inputDigit(value);
    } else if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
      const op = {
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "/"
      }[action];
      this.model.inputOperator(op);
    } else if (action === "equals") {
      const result = this.model.calculate();
      if (this.model.error) {
        this.view.update(this.model.makeExpression(), "Nu merge");
        return;
      }
      if (result !== null) {
        this.model.operand1 = result.toString();
        this.model.operand2 = "";
        this.model.operator = null;
      }
    } else if (action === "clear") {
      this.model.clear();
    }

    this.updateView();
  }

  updateView() {
    const expression = this.model.makeExpression();
    const result = this.model.error ? this.model.displayValue : this.model.displayValue || "0";
    this.view.update(expression, result);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const model = new CalculatorModel();
  const view = new CalculatorView();
  new CalculatorController(model, view);
});
