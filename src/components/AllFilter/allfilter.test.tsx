import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'

import Allfilter from './index'

describe(`Allfilter`, () => {
  it('render Allfilter', () => {

    act(() => {
      render(<Allfilter onChange={jest.fn()} />)
    })
    fireEvent.click(screen.getByText(/All/))
    expect(screen.getByText(/Done/))
    expect(screen.getByText(/Undone/))
    expect(screen.getAllByText(/All/)).toHaveLength(2)
    fireEvent.click(screen.getByText(/Done/))
    expect(screen.getByText(/Done/))
    expect(screen.queryByText(/All/)).toBeNull()
    expect(screen.queryByText(/Undone/)).toBeNull()
  })
})
