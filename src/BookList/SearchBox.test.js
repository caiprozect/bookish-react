import { render } from "@testing-library/react"
import SearchBox from "./SearchBox"
import userEvent from "@testing-library/user-event"

describe('Search Box', () => {
    it('renders input', () => {
        const props = {
            term: '',
            onSearch: jest.fn()
        }

        const {container} = render(<SearchBox {...props} />);
        const input = container.querySelector('input[type="text"]');
        userEvent.type(input, 'domain');

        expect(props.onSearch).toHaveBeenCalled();
    })

    it('trim empty strings', () => {
        const props = {
            term: '',
            onSearch: jest.fn()
        }

        const {container} = render(<SearchBox {...props} />);
        const input = container.querySelector('input[type="text"]');
        userEvent.type(input, '   ');

        expect(props.onSearch).not.toHaveBeenCalled();
    })
})