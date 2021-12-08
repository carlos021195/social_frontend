import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import Input from './Input';
import 'regenerator-runtime/runtime'
import { TestScheduler } from '@jest/core';

test('Input component renders', () => {
    const handleChange = jest.fn()
    const desc = "";
    const inputComponent = render(
        <Input type='text' desc={desc} onchange={handleChange}/>
    );
});
test('check input empty on render', () => {
    const handleChange = jest.fn()
    const desc = "";
    const { getByTestId } = render(
        <Input type='text' desc={desc} onchange={handleChange}/>
    );
    expect(getByTestId('inputTest').value).toEqual('');
});
test('check handle change works',() => {
    const handleChange = jest.fn()
    const desc = "Somehthing different";
    const { getByTestId } = render(
        <Input type='text' desc={desc} onchange={handleChange}/>
    );
    
    expect(getByTestId("inputTest").value).toEqual(desc);
})