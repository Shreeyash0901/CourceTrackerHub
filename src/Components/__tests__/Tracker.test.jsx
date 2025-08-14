import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tracker from '../Tracker';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

describe('Tracker Component', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.getItem.mockReturnValue(null);
  });

  test('renders the tracker with correct title', () => {
    render(<Tracker />);
    expect(screen.getByText(/Node\.js 30-Day Course Tracker/i)).toBeInTheDocument();
  });

  test('displays all 30 days of course content', () => {
    render(<Tracker />);
    const dayElements = screen.getAllByText(/Day \d+/);
    expect(dayElements).toHaveLength(30);
  });

  test('toggles day expansion when clicked', () => {
    render(<Tracker />);
    const firstDayButton = screen.getAllByRole('button')[1]; // Skip theme toggle
    fireEvent.click(firstDayButton);
    
    expect(screen.getByText(/Install Node\.js & npm/i)).toBeInTheDocument();
  });

  test('marks tasks as complete when checkbox is clicked', () => {
    render(<Tracker />);
    const firstDayButton = screen.getAllByRole('button')[1];
    fireEvent.click(firstDayButton);
    
    const firstTaskCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstTaskCheckbox);
    
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('calculates and displays progress percentage', () => {
    render(<Tracker />);
    expect(screen.getByText(/Progress: 0 \/ \d+ tasks \(0%\)/i)).toBeInTheDocument();
  });

  test('toggles dark mode', () => {
    render(<Tracker />);
    const darkModeButton = screen.getByText(/🌙 Dark/i);
    fireEvent.click(darkModeButton);
    
    expect(screen.getByText(/☀️ Light/i)).toBeInTheDocument();
  });

  test('loads saved progress from localStorage', () => {
    const mockProgress = {
      0: { 0: true, 1: false },
      1: { 0: true, 1: true }
    };
    localStorage.getItem.mockReturnValue(JSON.stringify(mockProgress));
    
    render(<Tracker />);
    
    expect(localStorage.getItem).toHaveBeenCalledWith('nodeCourseProgress_v3');
  });

  test('marks all tasks in a day as complete', () => {
    render(<Tracker />);
    const firstDayButton = screen.getAllByRole('button')[1];
    fireEvent.click(firstDayButton);
    
    const markAllButton = screen.getByText(/Mark all done/i);
    fireEvent.click(markAllButton);
    
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('displays correct task count for each day', () => {
    render(<Tracker />);
    
    // Check first day has correct task count
    expect(screen.getByText(/Day 1: Getting Started with Node\.js/)).toBeInTheDocument();
    expect(screen.getByText(/0\/4 tasks/)).toBeInTheDocument();
  });

  test('shows completion status when all tasks are done', () => {
    render(<Tracker />);
    const firstDayButton = screen.getAllByRole('button')[1];
    fireEvent.click(firstDayButton);
    
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));
    
    expect(screen.getByText(/4\/4 tasks/)).toBeInTheDocument();
  });
});
