# Test Plan for COBOL Account Management System

This test plan covers all current business logic from the COBOL app and is structured for stakeholder validation. Use the `Actual Result` and `Status` columns during execution.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|----------------|--------------------|----------|
| TC-001 | Launch app and display menu | COBOL binary compiled and available | 1) Run `./accountsystem` 2) Observe menu options | App displays options 1-4 and request choice | | | |
| TC-002 | View current balance using TOTAL | App running with initial state | 1) Enter `1` when prompted 2) Check output | Displays `Current balance: 1000.00` | | | |
| TC-003 | Credit account increases balance | App running with initial state or pre-existing balance | 1) Enter `2`; 2) Enter credit amount `250.00`; 3) After update, enter `1` to view balance | Balance is updated to `1250.00` | | | |
| TC-004 | Debit account decreases balance with sufficient funds | App running with balance >= debit amount (e.g., 1000.00) | 1) Enter `3`; 2) Enter debit amount `300.00`; 3) Enter `1` to view | Balance changes to `700.00` | | | |
| TC-005 | Debit account with insufficient funds rejects operation | App running with balance < requested debit (e.g., 1000.00, withdraw 2000.00) | 1) Enter `3`; 2) Enter debit amount `2000.00` | Displays "Insufficient funds for this debit." and balance remains unchanged | | | |
| TC-006 | Invalid menu choice handling | App running | 1) Enter `5` or `0` | Displays "Invalid choice, please select 1-4." and continues loop | | | |
| TC-007 | Exit flow | App running | 1) Enter `4` | Program displays "Exiting the program. Goodbye!" and terminates | | | |
| TC-008 | Data program READ operation match | `DataProgram` invoked through Operations flow | as part of credit/debit/reconcile flows | `DataProgram` returns `STORAGE-BALANCE` to caller | | | |
| TC-009 | Data program WRITE operation persist update | `DataProgram` invoked after credit or debit update | as part of credit/debit flow | `STORAGE-BALANCE` updates to new value | | | |
| TC-010 | Maintain balance while switching operations | Start at initial balance, credit and then debit operations combined | 1) Credit 200 2) Debit 100 3) View balance | Balance equals `1100.00` (as sequence +200, -100) | | | |

## Notes
- `Actual Result` and `Status` are to be filled during testing with the actual output and pass/fail indicator.
- For repeated runs, note that COBOL in-memory state resets to initial `1000.00` each process run.
- For integration with Node.js transformation, these cases become unit tests in business logic functions (`getBalance`, `credit`, `debit`, and validation methods).