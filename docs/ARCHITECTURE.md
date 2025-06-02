# QuickBet Architecture

## Overview

QuickBet follows Domain-Driven Design with a modular plugin architecture. The core domain logic is isolated from external dependencies through interfaces.

## Core Principles

1. **Dependency Inversion**: Core domain depends on interfaces, not implementations
2. **Module Isolation**: Each module can be developed, tested, and deployed independently
3. **Configuration-Driven**: Module selection happens at runtime via configuration
4. **Progressive Enhancement**: Start simple (JSON files) → scale to enterprise

## Layer Architecture

```
┌─────────────────────────────────────────┐
│          Presentation Layer             │
│         (React Components)              │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          Application Layer              │
│        (Use Cases, DTOs)                │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│           Domain Layer                  │
│     (Entities, Value Objects)          │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│        Infrastructure Layer             │
│    (Modules, External Services)         │
└─────────────────────────────────────────┘
```

## Module Types

### 1. Data Provider Module
**Purpose**: Abstract data source implementation
**Interface**: `IDataProvider`
**Implementations**: TheSportsDB, ESPN, Mock

### 2. Question Engine Module
**Purpose**: Generate contextual betting questions
**Interface**: `IQuestionGenerator`
**Implementations**: Per sport (Football, Basketball, etc.)

### 3. Odds Engine Module
**Purpose**: Calculate betting odds
**Interface**: `IOddsCalculator`
**Implementations**: Fixed, Probability-based, ML-based

### 4. Content Module
**Purpose**: Manage UI text and localization
**Interface**: `IContentProvider`
**Implementations**: JSON files, CMS

## Dependency Injection

```typescript
// Container setup
const container = new DIContainer()
container.register(DI_TOKENS.DataProvider, () => new MockDataProvider())
container.register(DI_TOKENS.QuestionService, () => new QuestionEngine())

// Usage in components
const dataProvider = container.get<IDataProvider>(DI_TOKENS.DataProvider)
```

## Data Flow

```
User Action → UI Component → Hook → Use Case → Domain Service → Module
                                                      ↓
                                                External API
```

## Security Boundaries

- **Public**: UI components, public APIs
- **Protected**: Use cases, domain logic
- **Private**: Module implementations, external credentials

## Scalability Points

1. **Horizontal**: Add more sports/markets via new modules
2. **Vertical**: Replace modules with more sophisticated versions
3. **Geographic**: Deploy region-specific modules