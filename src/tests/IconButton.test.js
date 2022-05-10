import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IconButton from "../components/IconButton";

describe('IconButton', () => {
    let props;

    beforeEach(() => {
        props = {
            icon: <i className="bi bi-arrow-repeat"></i>,
            withBorder: true,
            onClick: jest.fn(),
        }
    });

    it('renders', () => {
        const renderComponent = () => render(<IconButton {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('icon-button');
        expect(component).toBeDefined();
    });

    it('triggers onClick when user clicks', async () => {
        const renderComponent = () => render(<IconButton {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('icon-button');
        userEvent.click(component);
        await waitFor(() => {
            expect(props.onClick).toHaveBeenCalledTimes(1);
        });
    });

    it('has class with-border when withBorder prop is true', () => {
        const renderComponent = () => render(<IconButton {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('icon-button');
        expect(component.classList[1]).toBe('with-border');
    });

    it('renders the defined icon', () => {
        const renderComponent = () => render(<IconButton {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('icon-button').firstChild;
        expect(component.className).toBe('bi bi-arrow-repeat');
    });
});