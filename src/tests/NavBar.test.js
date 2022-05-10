import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NavBar from "../components/NavBar";

describe("NavBar", () => {
    let props;

    beforeEach(() => {
        props = {
            pageTitle: 'MyPage',
        }
    });

    it('renders', () => {
        const renderComponent = () => render(<NavBar {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('navbar');
        expect(component).toBeDefined();
    });

    it('renders the defined page title', () => {
        const renderComponent = () => render(<NavBar {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('page-title');
        expect(component.textContent).toBe('MyPage');
    });

    it('renders the back button when goBack function is provided', () => {
        const renderComponent = () => render(<NavBar {...props} goBack={jest.fn()} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('navbar').firstChild.firstChild;
        expect(component.nodeName).toBe('DIV');
        expect(component.className).toBe('back-button');
    });

    it('renders the logo button when goBack function is not provided', () => {
        const renderComponent = () => render(<NavBar {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('navbar').firstChild.firstChild;
        expect(component.nodeName).toBe('IMG');
        expect(component.className).toBe('icon');
    });
});