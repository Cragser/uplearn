# Shared Layer

This directory contains code and utilities that are shared between the client and server layers of the application.

## Purpose

- Houses common utilities and helpers
- Contains shared types and interfaces
- Manages shared constants and configurations
- Provides common validation functions

## Guidelines

1. Keep shared code platform-agnostic
2. Avoid dependencies on client or server specific libraries
3. Document any shared utilities thoroughly
4. Maintain backward compatibility when making changes

## Structure

- `/types` - Shared TypeScript types and interfaces
- `/utils` - Common utility functions
- `/constants` - Shared constant values
- `/validation` - Common validation logic