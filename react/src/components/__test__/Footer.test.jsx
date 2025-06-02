import Footer from '../Footer.jsx';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

test('renders with text', () => {
    render(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>
    );

    expect(screen.getByText(/ВелоСвіт — твій магазин велосипедів./i)).toBeInTheDocument();
});
