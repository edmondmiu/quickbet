# Contributing to QuickBet

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/quickbet.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Run tests: `npm test`
6. Submit a pull request

## Code Standards

### TypeScript
- Use strict mode
- Define interfaces for all module boundaries
- Export types from modules

### React Components
```typescript
// ✅ Good
export const MatchCard: FC<MatchCardProps> = ({ match, onSelect }) => {
  // Component logic
}

// ❌ Avoid
export default function MatchCard(props: any) {
  // Component logic
}
```

### Module Development
- Never modify core domain entities
- Always implement against interfaces
- Include unit tests for new modules
- Document public APIs

## Commit Messages

Format: `type(scope): description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `test`: Test updates
- `chore`: Build/tooling

Examples:
```
feat(question-engine): add tennis question generator
fix(data-provider): handle empty match response
docs(api): update betting endpoint documentation
```

## Testing Requirements

- Unit tests for all modules
- Integration tests for module interactions
- Minimum 80% code coverage
- Test both success and error cases

## Pull Request Process

1. Update documentation
2. Add/update tests
3. Ensure CI passes
4. Request review
5. Address feedback

## Module Contribution

When adding a new module:
1. Follow the module interface pattern
2. Add to module registry
3. Include usage examples
4. Document configuration options

## Questions?

Open an issue for discussion before making large changes.