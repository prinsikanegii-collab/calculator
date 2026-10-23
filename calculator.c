#include <stdio.h>

int main() {
    double num1, num2, result;
    char operator;

    printf("-\n");
    printf("       C CALCULATOR\n");
    printf("-\n");

    printf("Enter first number: ");
    scanf("%lf", &num1);

    printf("Enter an operator (+, -, *, /): ");
    scanf(" %c", &operator);

    printf("Enter second number: ");
    scanf("%lf", &num2);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;

        case '-':
            result = num1 - num2;
            break;

        case '*':
            result = num1 * num2;
            break;

        case '/':
            if (num2 == 0) {
                printf("Error: Cannot divide by zero.\n");
                return 1;
            }
            result = num1 / num2;
            break;

        default:
            printf("Error: Invalid operator.\n");
            return 1;
    }

    printf("----------------------------\n");
    printf("Result: %.2lf\n", result);
    printf("============================\n");

    return 0;
}