# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a proof of concept for implementing CQRS (Command Query Responsibility Segregation) pattern with Express.js.

## Commands

### Development
Currently no build or run commands configured. Standard npm commands apply once dependencies are added.

### Testing
```bash
npm test
```
Note: Tests are not yet configured.

## Architecture

This project is in early stages. The CQRS pattern typically involves:

- **Commands**: Operations that modify state (write operations)
- **Queries**: Operations that read state (read operations)
- **Event Store**: Persistence layer for events
- **Command Handlers**: Process commands and generate events
- **Query Handlers**: Process queries against read models
- **Event Handlers**: Update read models based on events

When implementing:
- Keep command and query responsibilities strictly separated
- Commands should be imperative (e.g., CreateOrder, UpdateInventory)
- Queries should be noun-based (e.g., GetOrderById, FindProductsByCategory)
- Use events to communicate between write and read sides
- Consider using an event sourcing approach if full audit trail is needed
