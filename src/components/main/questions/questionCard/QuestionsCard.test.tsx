import { screen, fireEvent } from '@testing-library/react';
import { render } from './../../../../../TestUtil';
import { QuestionCard, InputRadio } from './QuestionCard';

const fn = jest.fn();
describe('QuestionCard', () => {
  test('renders QuestionCard', () => {
    render(
      <QuestionCard
        question={{
          correct_answer: '',
          question: '',
          category: '',
          type: '',
          difficulty: '',
          incorrect_answers: []
        }}
        goToNext={fn}
        goToPrev={fn}
        setClicked={fn}
        sliceStart={0}
        clicked={true}
      />
    );
    expect(screen.getByText(/Question/i)).toBeInTheDocument();
  });
  test('renders InputRadio', () => {
    render(
      <InputRadio
        ans=""
        question={{
          correct_answer: '',
          question: ''
        }}
        difficulty=""
      />
    );
    expect(screen.getByTestId('input-radio')).toBeInTheDocument();
  });
  test('select one question on click', () => {
    render(
      <InputRadio
        ans="A question here"
        question={{
          correct_answer: '',
          question: ''
        }}
        difficulty=""
      />
    );
    const inputElement = screen.getByRole('radio');
    const labelElement = screen.getByText('A question here');
    fireEvent.change(inputElement, { target: { checked: true } });
    expect(labelElement.textContent).toBe('A question here');
  });
});
