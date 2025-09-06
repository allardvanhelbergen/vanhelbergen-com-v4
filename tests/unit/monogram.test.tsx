import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Monogram } from '@/components/ui/monogram';

describe('Monogram', () => {
  it('renders with accessible label', () => {
    render(<Monogram title="AVH monogram" size={64} />);
    const svg = screen.getByRole('img', { name: /avh monogram/i });
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
  });

  it('uses presentation role when title is empty', () => {
    render(<Monogram title="" />);
    const img = screen.queryByRole('img');
    expect(img).toBeNull();
  });
});
