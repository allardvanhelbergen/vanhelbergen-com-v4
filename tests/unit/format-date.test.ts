import { describe, it, expect } from 'vitest';
import { formatDateRFC822 } from '../../lib/format-date';

describe('formatDateRFC822', () => {
  it('formats a date string to expected pattern', () => {
    const result = formatDateRFC822('2024-01-15T12:00:00Z');
    expect(result).toMatch(/Mon, 15 Jan 2024|Tue, 16 Jan 2024/); // timezone differences safeguard
  });

  it('formats a Date instance', () => {
    const input = new Date('2025-02-02T00:00:00Z');
    const result = formatDateRFC822(input);
    expect(result).toMatch(/Sun, 02 Feb 2025|Sat, 01 Feb 2025/); // timezone differences
  });
});
