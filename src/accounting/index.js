#!/usr/bin/env node
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let storageBalance = 1000.00;

function resetBalance() {
  storageBalance = 1000.00;
}

function readBalance() {
  return storageBalance;
}

function writeBalance(newBalance) {
  storageBalance = newBalance;
}

function creditAmount(amount) {
  if (Number.isNaN(amount) || amount < 0) {
    throw new Error('Invalid amount');
  }
  const updated = readBalance() + amount;
  writeBalance(updated);
  return updated;
}

function debitAmount(amount) {
  if (Number.isNaN(amount) || amount < 0) {
    throw new Error('Invalid amount');
  }
  const current = readBalance();
  if (current >= amount) {
    const updated = current - amount;
    writeBalance(updated);
    return {
      success: true,
      balance: updated,
    };
  }
  return {
    success: false,
    message: 'Insufficient funds',
    balance: current,
  };
}

function prompt(question) {
  return new Promise((resolve) => {
    readline.question(question, (answer) => resolve(answer));
  });
}

async function main() {
  let continueFlag = true;

  while (continueFlag) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choice = await prompt('Enter your choice (1-4): ');

    switch (choice.trim()) {
      case '1': {
        const balance = readBalance();
        console.log(`Current balance: ${balance.toFixed(2)}`);
        break;
      }
      case '2': {
        const amountText = await prompt('Enter credit amount: ');
        const amount = parseFloat(amountText);

        if (Number.isNaN(amount) || amount < 0) {
          console.log('Invalid amount. Please enter a non-negative number.');
          break;
        }

        const current = readBalance();
        const updated = current + amount;
        writeBalance(updated);
        console.log(`Amount credited. New balance: ${updated.toFixed(2)}`);
        break;
      }
      case '3': {
        const amountText = await prompt('Enter debit amount: ');
        const amount = parseFloat(amountText);

        if (Number.isNaN(amount) || amount < 0) {
          console.log('Invalid amount. Please enter a non-negative number.');
          break;
        }

        const current = readBalance();
        if (current >= amount) {
          const updated = current - amount;
          writeBalance(updated);
          console.log(`Amount debited. New balance: ${updated.toFixed(2)}`);
        } else {
          console.log('Insufficient funds for this debit.');
        }
        break;
      }
      case '4': {
        continueFlag = false;
        break;
      }
      default:
        console.log('Invalid choice, please select 1-4.');
        break;
    }
  }

  console.log('Exiting the program. Goodbye!');
  readline.close();
}

if (require.main === module) {
  main();
}

module.exports = {
  resetBalance,
  readBalance,
  writeBalance,
  creditAmount,
  debitAmount,
  main,
};
