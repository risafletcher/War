import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from '.';
import { Player } from '../../models';

describe('<Game/>', () => {
    const props = {
        setView: () => {},
        player1: new Player('test1'),
        player2: new Player('test2')
    };

    test('it renders players names', () => {
        const { getByText } = render(<Game {...props}/>);
        expect(getByText('test1')).toBeVisible();
        expect(getByText('test2')).toBeVisible();
    });

    test('it increments the down stack on every turn', () => {
        const { getByText, getAllByText } = render(<Game {...props}/>);
        expect(getAllByText('Down stack size: 0').length).toEqual(2);
        const playButton = getByText('Play Turn');
        expect(playButton).toBeVisible();
        fireEvent.click(playButton);
        expect(getByText('Down stack size: 2')).toBeVisible();
    });

    test('it decrements the cards remaining on every turn', () => {
        const cleanProps = {
            setView: () => {},
            player1: new Player('test1'),
            player2: new Player('test2')
        };
        const { getByText } = render(<Game {...cleanProps}/>);
        expect(getByText('Cards remaining in deck: 26')).toBeVisible();
        const playButton = getByText('Play Turn');
        expect(playButton).toBeVisible();
        fireEvent.click(playButton);
        expect(getByText('Cards remaining in deck: 25')).toBeVisible();
    });
});