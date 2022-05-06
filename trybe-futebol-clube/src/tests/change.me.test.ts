import * as sinon from 'sinon';
import { expect, request, use } from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import Users from '../database/models/Users';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

use(chaiHttp);

describe('/login', () => {
  let result: Response;
  
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjUxNTIxMjQzLCJleHAiOjE2NTE2MDc2NDN9.P26QPFMfUPqImOfWM0zOHzxWCDl2twUvnQN3tFJ18gI';
  
  const user = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }
  
  beforeEach(sinon.restore);
  
  it('Retorna um erro caso não seja fornecido um email.', async () => {
    const result = await request(app)
      .post('/login')
      .send({ password: "secret_admin" })
    
    expect(result.status).to.equal(400);
    expect(result.body.message).to.deep.equal('All fields must be filled');
  });

  it('Retorna um erro caso não seja fornecido um email com formato válido.', async () => {
    const result = await request(app)
      .post('/login')
      .send({ email: "admin#admin@com", password: "secret_admin" })
    
    expect(result.status).to.equal(401);
    expect(result.body.message).to.deep.equal('Incorrect email or password');
  });

  it('Retorna um erro caso o email não exista no Banco de Dados', async () => {
    sinon.stub(Users, 'findOne').resolves(null);

    const result = await request(app)
      .post('/login')
      .send({ email: "user@admin.com", password: "secret_admin" })
    
    expect(result.status).to.equal(401);
    expect(result.body.message).to.deep.equal('Incorrect email or password');
  });

  it('Retorna um erro caso não seja fornecido um password.', async () => {
    const result = await request(app)
      .post('/login')
      .send({ email: "admin@admin.com" });
    
    expect(result.status).to.equal(400);
    expect(result.body.message).to.deep.equal('All fields must be filled');
  });

  it('Retorna um erro caso não seja fornecido um password com formato válido.', async () => {
    const result = await request(app)
      .post('/login')
      .send({ email: "admin@admin.com", password: "12345" })
    
    expect(result.status).to.equal(401);
    expect(result.body.message).to.deep.equal('Incorrect email or password');
  });

  it('Retorna um erro caso o password esteja errado', async () => {
    const result = await request(app)
      .post('/login')
      .send({ email: "admin@admin.com", password: "not_secret_admin" })
    
    expect(result.status).to.equal(401);
    expect(result.body.message).to.deep.equal('Incorrect email or password');
  });

  it('Retorna um token e as informações do usuário se o email e senha estiverem corretos', async () => {
    sinon.stub(Users, 'findOne').resolves(user as Users);
    
    const result = await request(app)
      .post('/login')
      .send({ email: "admin@admin.com", password: "secret_admin" })
    
    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal({
        user: {
          id: 1,
          username: "Admin",
          role: "admin",
          email: "admin@admin.com"
        },
        token: result.body.token
    });
  });

  it('Retorna o tipo de usuário se for utilizado um token válido', async () => {
    const result = await request(app)
    .get('/login/validate')
    .set('authorization', token)

    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal('admin');
  });

});

describe('/teams', () => {
  let result: Response;

  const teams = [
    { id: 1, teamName: "Avaí/Kindermann" },
    { id: 2, teamName: "Bahia" },
    { id: 3, teamName: "Botafogo" },
  ]

  beforeEach(sinon.restore);

  it('Retorna todos os times', async () => {
    sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);

    const result = await request(app)
      .get('/teams')

    expect(result.status).to.equal(200);
    expect(result.body).to.deep.equal([
      { id: 1, teamName: "Avaí/Kindermann" },
      { id: 2, teamName: "Bahia" },
      { id: 3, teamName: "Botafogo" },
    ]);
  });

  it('Retorna o time associado ao id fornecido', async () => {
    sinon.stub(Teams, 'findByPk').resolves(teams[0] as Teams);

    const result = await request(app)
    .get('/teams/1')

  expect(result.status).to.equal(200);
  expect(result.body).to.deep.equal({ id: 1, teamName: "Avaí/Kindermann" });
  });
})

describe('/matches', () => {
  let result: Response;

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjUxNTIxMjQzLCJleHAiOjE2NTE2MDc2NDN9.P26QPFMfUPqImOfWM0zOHzxWCDl2twUvnQN3tFJ18gI';

  const match = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true,
  }

  const inProgress = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    }];

  beforeEach(sinon.restore);
  
  // it('Retorna a partida associada ao id fornecido', async () => {});
  // it('Finaliza a partida associada ao id fornecido', async () => {});
  // it('Retorna todas as partidas', async () => {});
  // it('Retorna todas as partidas finalizadas', async () => {});

  it('Retorna todas as partidas em andamento', async () => {
    sinon.stub(Matches, 'findAll').resolves(inProgress as unknown as Matches[]);

    const result = await request(app)
    .get('/matches')
    .query({ inProgress: 'true' })
    
    expect(result.status).to.equal(200);
    expect(result.body[0].inProgress).to.deep.equal(true);
  });
  
  it('Retorna um erro caso não seja fornecido um token', async () => {
    const result = await request(app)
    .post('/matches')
    .send({
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true,
    });

    expect(result.status).to.equal(401);
    expect(result.body.message).to.deep.equal('Token not found');
  });

  it('Retorna um erro caso o token não seja válido', async () => {
    const result = await request(app)
    .post('/matches')
    .set('authorization', 'iOCI6IkpXVCJ9.eyJpZCI6MS4uY29tIiwi.P26QPFMf')
    .send({
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true,
    });

    expect(result.status).to.equal(401);
    expect(result.body.message).to.deep.equal('Invalid Token');
  });

  it('Cria uma partida com sucesso', async () => {
    sinon.stub(Matches, 'create').resolves(match as unknown as Matches);

    const result = await request(app)
    .post('/matches')
    .set('authorization', token)
    .send({
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true,
    });

    expect(result.status).to.equal(201);
    expect(result.body).to.deep.equal({
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    });
  });

  it('Retorna um erro caso o time não exista no banco de dados', async () => {
    sinon.stub(Teams, 'findAll').resolves([] as unknown as Teams[]);

    const result = await request(app)
    .post('/matches')
    .set('authorization', token)
    .send({
      homeTeam: 18,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true,
    });

    expect(result.status).to.equal(404);
    expect(result.body.message).to.deep.equal('There is no team with such id!');
  });

  it('Retorna um erro caso seja inserido dois times iguais', async () => {
    const result = await request(app)
    .post('/matches')
    .set('authorization', token)
    .send({
      homeTeam: 8,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true,
    });

    expect(result.status).to.equal(400);
    expect(result.body.message).to.deep.equal('It is not possible to create a match with two equal teams');
  });

  it('Cria uma partida com sucesso', async () => {
    sinon.stub(Matches, 'create').resolves(match as unknown as Matches);

    const result = await request(app)
    .post('/matches')
    .set('authorization', token)
    .send({
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true,
    });

    expect(result.status).to.equal(201);
    expect(result.body).to.deep.equal({
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    });
  });
})
