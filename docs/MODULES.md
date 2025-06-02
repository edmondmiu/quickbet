# Module Development Guide

## Creating a New Module

### Step 1: Define the Interface
```typescript
// modules/your-module/interfaces/IYourModule.ts
export interface IYourModule {
  doSomething(input: Input): Promise<o>
}
```

### Step 2: Implement the Module
```typescript
// modules/your-module/implementations/YourImplementation.ts
export class YourImplementation implements IYourModule {
  async doSomething(input: Input): Promise<o> {
    // Implementation
  }
}
```

### Step 3: Register the Module
```typescript
// app/config/modules.config.ts
export const moduleConfig = {
  yourModule: {
    default: 'implementation-name',
    implementations: {
      'implementation-name': () => import('@/modules/your-module/implementations/YourImplementation')
    }
  }
}
```

## Module Examples

### Data Provider Module
```typescript
export class CustomDataProvider implements IDataProvider {
  name = 'custom'
  
  async getMatches(filters?: MatchFilters): Promise<RawMatchData[]> {
    const response = await fetch(this.apiUrl)
    return this.transformData(response)
  }
  
  mapToEntity(raw: RawMatchData): Match {
    return new Match({
      id: raw.matchId,
      homeTeam: new Team(raw.home),
      awayTeam: new Team(raw.away),
      // ... mapping logic
    })
  }
}
```

### Question Generator Module
```typescript
export class CricketQuestionGenerator implements IQuestionGenerator {
  sport = SportType.CRICKET
  
  canGenerate(match: Match): boolean {
    return match.sport === SportType.CRICKET && match.isLive()
  }
  
  generate(match: Match, context: QuestionContext): Question[] {
    const questions: Question[] = []
    
    if (this.isOverEnding(match)) {
      questions.push(this.createRunsInOverQuestion(match))
    }
    
    if (this.isBatsmanNearMilestone(match)) {
      questions.push(this.createMilestoneQuestion(match))
    }
    
    return questions
  }
}
```

## Testing Modules

### Unit Testing
```typescript
describe('CustomDataProvider', () => {
  let provider: CustomDataProvider
  
  beforeEach(() => {
    provider = new CustomDataProvider()
  })
  
  test('maps raw data correctly', () => {
    const raw = createMockRawData()
    const entity = provider.mapToEntity(raw)
    
    expect(entity.id).toBe('expected-id')
    expect(entity.homeTeam.name).toBe('Home Team')
  })
})
```

### Integration Testing
```typescript
test('module works with DI container', async () => {
  const container = new DIContainer()
  container.register(DI_TOKENS.DataProvider, () => new CustomDataProvider())
  
  const provider = container.get<IDataProvider>(DI_TOKENS.DataProvider)
  const matches = await provider.getMatches()
  
  expect(matches).toHaveLength(3)
})
```

## Module Checklist

- [ ] Interface defined in `/interfaces`
- [ ] Implementation in `/implementations`
- [ ] Unit tests written
- [ ] Integration test with container
- [ ] Registered in module config
- [ ] Documentation updated
- [ ] Error handling implemented
- [ ] TypeScript types exported