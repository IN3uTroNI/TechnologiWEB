class CalculatorView {
  constructor() {
    this.expressionEl = document.getElementById("expression");
    this.resultEl = document.getElementById("result");
    this.buttonsContainer = document.querySelector(".buttons");
  }

  bindButtonClick(handler) {
    this.buttonsContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (!target.matches("button")) return;

      const action = target.dataset.action;
      const value = target.dataset.value;
      handler(action, value);
    });
  }

  update(expression, result) {
    this.expressionEl.textContent = expression;
    this.resultEl.textContent = result;
  }

  showError(message) {
    this.resultEl.textContent = message;
  }
}
