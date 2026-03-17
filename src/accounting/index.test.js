const {
  resetBalance,
  readBalance,
  writeBalance,
  creditAmount,
  debitAmount,
} = require('./index');

describe('Accounting business logic', () => {
  beforeEach(() => {
    resetBalance();
  });

  test('TC-001: initial balance is 1000', () => {
    expect(readBalance()).toBe(1000.0);
  });

  test('TC-002: view current balance', () => {
    expect(readBalance()).toBe(1000.0);
  });

  test('TC-003: credit account increases balance', () => {
    const result = creditAmount(250.0);
    expect(result).toBe(1250.0);
    expect(readBalance()).toBe(1250.0);
  });

  test('TC-004: debit account decreases balance with sufficient funds', () => {
    const creditResult = creditAmount(0); // keep 1000
    expect(creditResult).toBe(1000.0);
    const debitResult = debitAmount(300.0);
    expect(debitResult.success).toBe(true);
    expect(debitResult.balance).toBe(700.0);
    expect(readBalance()).toBe(700.0);
  });

  test('TC-005: debit account insufficient funds blocks operation', () => {
    const result = debitAmount(2000.0);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Insufficient funds');
    expect(result.balance).toBe(1000.0);
    expect(readBalance()).toBe(1000.0);
  });

  test('TC-006.1: invalid negative credit amount throws', () => {
    expect(() => creditAmount(-10)).toThrow('Invalid amount');
  });

  test('TC-006.2: invalid negative debit amount throws', () => {
    expect(() => debitAmount(-10)).toThrow('Invalid amount');
  });

  test('TC-010: combined credit then debit yields correct balance', () => {
    creditAmount(200.0);
    const debitResult = debitAmount(100.0);
    expect(debitResult.success).toBe(true);
    expect(readBalance()).toBe(1100.0);
  });
});