import React from 'react';
import { render } from '@testing-library/react';
import Game from '.';
import { Player } from '../models';

describe('<Game/>', () => {
    const props = {
        player1: new Player(),
        player2: new Player(),
    };
    test('it renders', () => {
        const { container } = render(<Game {...props} />);
        expect(container).toBeEmpty();
    });
});