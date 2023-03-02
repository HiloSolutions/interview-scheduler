import React from 'react'
import axios from 'axios'

import {
  render,
  cleanup,
  waitForElement,
  waitForElementToBeRemoved,
  getByAltText,
  getByPlaceholderText
} from '@testing-library/react'
import { fireEvent } from '@testing-library/react/dist'
import {
  getByText,
  prettyDOM,
  getAllByTestId,
  queryByText,
  queryByAltText
} from '@testing-library/react'

import Application from 'components/Application'

afterEach(cleanup)

describe('Application', () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument()

    await waitForElement(() => queryByText(appointment, 'Lydia Miller-Jones'))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
    console.log(prettyDOM(day));
  })
});