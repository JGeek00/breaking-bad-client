import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Search from '../components/Search';


describe('Search component', () => {
    let props;

    beforeEach(() => {
        props = {
            value: '',
            onChange: jest.fn(),
            placeholder: 'Search',
            icon: 'bi-search',
            allowClear: true,
        }
    });

    it('renders', () => {
        const renderComponent = () => render(<Search {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('search-component');
        expect(component).toBeDefined();
    });

    it('has value passed by props', () => {
        const renderComponent = () => render(<Search {...props} value='abc' />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('search-field');
        expect(component.value).toBe('abc')
    });
    
    it('changes value when user writes', async () => {
        const renderComponent = () => render(<Search {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('search-field');
        userEvent.type(component, 'abc');
        await waitFor(() => {
            expect(props.onChange).toHaveBeenCalledTimes(3);
        });
    });

    it('leading icon exists', () => {
        const renderComponent = () => render(<Search {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('leading-icon');
        expect(component).toBeDefined();
    });

    it('leading icon has defined icon class', () => {
        const renderComponent = () => render(<Search {...props} />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('leading-icon');
        expect(component.classList[2]).toBe('bi-search');
    });

    it('clear button is enabled', () => {
        const renderComponent = () => render(<Search {...props} value="abc" />);
        const { getByTestId } = renderComponent();
        const component = getByTestId('trailing-icon');
        expect(component).toBeDefined();
    });
});