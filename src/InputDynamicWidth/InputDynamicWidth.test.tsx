import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';

import InputDynamicWidth, { InputDynamicWidthProps } from './InputDynamicWidth'

const mockOnChange = jest.fn();

const mockGetBoundingClientRect = (width: number) => ({
  width
})

const defaultPadding = 1;

const defaultProps = {
  onChange: mockOnChange,
  padding: defaultPadding,
} as InputDynamicWidthProps;


type NodeWidth = Pick<
  HTMLElement,
  'offsetWidth'
> & {
  getBoundingClientRect: (width: number) => ({
    width: number
  })
}

const setMockRefElement = (node: NodeWidth): void => {
  const mockRef = {
    get current () {
      // jest dom elements have no width,
      // so mocking a browser situation
      return node;
    },
    // we need a setter here because it gets called when you 
    // pass a ref to <component ref={ref} />
    set current (_value) { },
  };

  jest.spyOn(React, 'useRef').mockReturnValue(mockRef);
};


const setup = (props?: InputDynamicWidthProps) => {
  const newProps = {
    ...defaultProps,
    ...props
  } as InputDynamicWidthProps;

  const utils = render(<InputDynamicWidth {...newProps} />);
  // sometimes for awaiting an appearance of element it needs to be in a function

  const input = () => screen.getByRole('textbox') as HTMLInputElement;

  return {
    ...utils,
    input
  }
}

describe('InputDynamicWidth', () => {

  it('should render', () => {
    const { input } = setup();
    // expect(asFragment()).toMatchSnapshot();

    expect(input()).toBeInTheDocument();
    expect(input()).toHaveStyle('width: 1px');
  })

  it('should change the input width onChange', () => {

    const testValue = 'testing 123'

    setMockRefElement({ offsetWidth: testValue.length, getBoundingClientRect: () => mockGetBoundingClientRect(testValue.length) })

    const { input } = setup();

    act(() => {
      fireEvent.change(input(), { target: { value: testValue } });
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(input().value).toBe(testValue);
    expect(input()).toHaveStyle('width:' + (testValue.length + defaultPadding) + 'px');

  });

  it('should use initialWidth', () => {

    const testValue = 'testing 123'

    setMockRefElement({ offsetWidth: testValue.length, getBoundingClientRect: () => mockGetBoundingClientRect(testValue.length) })

    const { input } = setup({ ...defaultProps, initialWidth: testValue.length });

    expect(input()).toHaveStyle('width:' + (testValue.length + defaultPadding) + 'px');

  })


  it('should use padding', () => {

    const testValue = 'testing 123'

    setMockRefElement({ offsetWidth: testValue.length, getBoundingClientRect: () => mockGetBoundingClientRect(testValue.length) })

    const { input } = setup({ ...defaultProps, initialWidth: testValue.length, padding: 20 });

    expect(input()).toHaveStyle('width:' + (testValue.length + 20) + 'px');

  })

})
