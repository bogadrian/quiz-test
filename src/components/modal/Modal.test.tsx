import { screen } from '@testing-library/react';
import { render } from './../../../TestUtil';
import { ModalComp } from './ModalComp';

const fn = jest.fn();
describe('ModalComp', () => {
  test('renders ModalComp', () => {
    render(
      <ModalComp handleNo={fn} handleYes={fn} iRegistred={fn} open={true} />
    );
    expect(screen.getAllByText('Register')).toBeTruthy();
  });
});
