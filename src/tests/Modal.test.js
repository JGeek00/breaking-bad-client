import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "../components/Modal";

describe('Modal', () => {
    let props;

    beforeEach(() => {
        props = {
            open: true,
            title: "Modal title",
            content: <div>Modal content</div>,
            closeClickOutside: false,
            defaultButtons: true,
            onClose: jest.fn(),
        }
    });

    it('renders', () => {
        const renderComponent = () => render(<Modal {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('modal');
        expect(component).toBeDefined();
    });

    it('is open when open prop is true', () => {
        const renderComponent = () => render(<Modal {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('modal');
        expect(component.classList[1]).toBe('open');
    });

    it('renders title passed by props', () => {
        const renderComponent = () => render(<Modal {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('title');
        expect(component.textContent).toBe('Modal title');
    });

    it('renders content passed by props', () => {
        const renderComponent = () => render(<Modal {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('content');
        expect(component.innerHTML).toBe("<div>Modal content</div>");
    });
    
    it('closes when click outside', async () => {
        const thisProps = {...props, closeClickOutside: true};
        const renderComponent = () => render(<Modal {...thisProps} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('modal');
        userEvent.click(component);
        await waitFor(() => {
            expect(props.onClose).toBeCalledTimes(1);
        });
    });

    it('does not close when click outside and closeClickOutside is false', async () => {
        const renderComponent = () => render(<Modal {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('modal');
        userEvent.click(component);
        await waitFor(() => {
            expect(props.onClose).toBeCalledTimes(0);
        });
    });

    it('renders default buttons when defaultButtons is true', () => {
        const renderComponent = () => render(<Modal {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('default-buttons');
        expect(component).toBeDefined();
    });

    it('triggers onClose when default close button is clicked', async () => {
        const renderComponent = () => render(<Modal {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('default-buttons').firstChild;
        userEvent.click(component);
        await waitFor(() => {
            expect(props.onClose).toBeCalledTimes(1);
        });
    });
});