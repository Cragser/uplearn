# Domain Layer

This directory contains the core business logic and entities of the application. The code here represents the fundamental business rules and should be independent of external frameworks or tools.

## Purpose

- Contains business entities and logic
- Defines core interfaces and types
- Implements business rules and validations
- Remains framework-agnostic

## Guidelines

1. Code in this layer should not depend on external frameworks or libraries
2. Business rules should be clearly defined and documented
3. Use TypeScript interfaces and types to ensure type safety
4. Keep the code focused on business logic only

## Structure

- `/entities` - Core business objects
- `/interfaces` - TypeScript interfaces and types
- `/services` - Business logic implementation
- `/validators` - Business rule validations