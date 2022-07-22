import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWhitRouter';
import App from '../App'

test('Testando o componente login contem uma tag "h1" com o texto "TryBeer"', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/Trybeer/i);
  expect(linkElement).toBeInTheDocument();
});

test('verificando o input de email', () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId('common_login__input-email');  
  expect(emailInput).toBeInTheDocument();
  expect(emailInput.type).toBe('email');
  
});

test('verificando o input de senha', () => {
  renderWithRouter(<App />);
  const passwordInput = screen.getByTestId('common_login__input-password');
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput.type).toBe('password');
});

test('verificando se existem dois botões na tela de login', () => {
  renderWithRouter(<App />);
  const getAllButtons = screen.getAllByRole('button');
  expect(getAllButtons).toHaveLength(2);
});

test('verificando se existe o botão que realiza o login', () => {
  renderWithRouter(<App />);
  const getLogButton = screen.getByTestId('common_login__button-login');
  expect(getLogButton).toBeInTheDocument();
  expect(getLogButton).toHaveProperty('type', 'button');
  expect(getLogButton).toHaveTextContent('LOGIN');
});

test('verificando se existe o botão que para cadastrar novo usuario', () => {
  renderWithRouter(<App />);
  const getLogButton = screen.getByTestId('common_login__button-register');
  expect(getLogButton).toBeInTheDocument();
  expect(getLogButton).toHaveProperty('type', 'button');
  expect(getLogButton).toHaveTextContent('Ainda não tenho conta');
});

test(
  'verificando que quando apertamos o botão "Ainda não tenho conta ele vai pra outra conta"', 
  () => {
  const { history } = renderWithRouter(<App />);
  const getRegisterButton = screen.getByRole('button', {name: 'Ainda não tenho conta'});
  userEvent.click(getRegisterButton);
  const { pathname } = history.location;

  expect(pathname).toBe('/register');

  const registerName = screen.getByTestId('common_register__input-name');
  const registerEmail = screen.getByTestId('common_register__input-email');
  const registerPassword = screen.getByTestId('common_register__input-password');
  const buttonRegister = screen.getByTestId('common_register__button-register');
  const backButton = screen.getByRole('button', { name: 'voltar' })

  expect(registerName).toBeInTheDocument();
  expect(registerEmail).toBeInTheDocument();
  expect(registerPassword).toBeInTheDocument();
  expect(buttonRegister).toBeInTheDocument();
  expect(backButton).toBeInTheDocument();
});