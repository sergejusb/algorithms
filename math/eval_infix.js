var Stack = require('../data-structures/stack.js');

function eval_infix(expr) {
    var stack = new Stack();
    expr = "(" + expr + ")"; // to trigger last evaluation

    var token = ""; 
    for (var i = 0; i < expr.length; i++) {
        if (expr[i] === "-") {
            token = expr[i];
        } 
        else if (expr[i] >= "0" && expr[i] <= "9") {
            token += expr[i];
        }
        else {
            if (token !== "") {
                stack.push(token);
                token = "";
            }

            if (expr[i] === "+" || expr[i] === "*" || expr[i] === "/") {
                stack.push(expr[i]);
            }
            else if (expr[i] === "(" || expr[i] === " ") {
                // skip
            }
            else if (expr[i] === ")") {
                var operand2 = parseInt(stack.pop());
                var operator = stack.pop();
                var operand1 = parseInt(stack.pop());
                var result = undefined;
                switch(operator) {
                    case "+": 
                        result = operand1 + operand2;
                        break;
                    case "-":
                        result = operand1 - operand2;
                        break;
                    case "*":
                        result = operand1 * operand2;
                        break;
                    case "/":
                        result = operand1 / operand2;
                        break;
                    default:
                        throw new Error("Unsupported operator " + operator);
                }
                stack.push(result);
            }
            else {
                throw new Error("Unsupported token " + expr[i]);
            }
        }
    }

    return stack.pop();
}

module.exports = eval_infix;