import { rest } from 'msw'
import { nanoid } from '@reduxjs/toolkit'
import { addDays } from 'date-fns'

const token = nanoid()

export const handlers = [
  rest.get('/protected', (req, res, ctx) => {
    const headers = req.headers.all()
    if (headers.authorization !== `Bearer ${token}`) {
      return res(
        ctx.json({
          message: 'You shall not pass. Please login first.',
        }),
        ctx.status(401),
      )
    }
    return res(
      ctx.json({
        message: 'Join us on the Reactiflux Discord server in #redux if you have any questions.',
      }),
    )
  }),
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.delay(400),
      ctx.json({
        user: {
          id_usuario: 1,
          nome: 'Joana',
          sobrenome: 'Soares',
          email: 'joana@soares.com',
          lgpd: 1,
        },
        token,
      }),
    )
  }),
  rest.post('/signup', (req, res, ctx) => {
    return res(
      ctx.delay(400),
      ctx.json({
        user: {
          id_usuario: 1,
          nome: 'Joana',
          sobrenome: 'Soares',
          email: 'joana@soares.com',
          lgpd: 1,
        },
      }),
    )
  }),
  rest.post('/tarefas', (req, res, ctx) => {
    return res(
      ctx.delay(400),
      ctx.json({
        tarefa: {
          id_tarefa: 1,
          nome_tarefa: 'Tarefa massinha',
          dt_inicial: new Date(),
          dt_final: new Date(),
          hora: 12,
          stts_tarefa: 0,
          descricao: 'tarefa qq ',
          id_usuario: 1,
        },
      }),
    )
  }),
  rest.get('/tarefas/:tarefa_id', (req, res, ctx) => {
    return res(
      ctx.json({
        tarefa: {
          id_tarefa: req.params.tarefa_id,
          nome_tarefa: 'Tarefa massinha',
          dt_inicial: new Date(),
          dt_final: new Date(),
          hora: 12,
          stts_tarefa: 0,
          descricao: 'tarefa qq ',
          id_usuario: 1,
        },
      }),
    )
  }),
  rest.get('/tarefas', (req, res, ctx) => {
    return res(
      ctx.json({
        tarefas: [
          {
            id_tarefa: 1,
            nome_tarefa: 'Tarefa massinha',
            dt_inicial: new Date(),
            dt_final: new Date(),
            hora: 12,
            stts_tarefa: 0,
            descricao: 'tarefa qq ',
            id_usuario: 1,
          },
          {
            id_tarefa: 2,
            nome_tarefa: 'Tarefa massinha',
            dt_inicial: new Date(),
            dt_final: addDays(new Date(), 4),
            hora: 12,
            stts_tarefa: 0,
            descricao: 'tarefa qq ',
            id_usuario: 1,
          },
          {
            id_tarefa: 3,
            nome_tarefa: 'Tarefa massinha',
            dt_inicial: new Date(),
            dt_final: addDays(new Date(), 14),
            hora: 12,
            stts_tarefa: 0,
            descricao: 'tarefa qq ',
            id_usuario: 1,
          },
          {
            id_tarefa: 4,
            nome_tarefa: 'Tarefa massinha',
            dt_inicial: new Date(),
            dt_final: addDays(new Date(), 8),
            hora: 12,
            stts_tarefa: 0,
            descricao: 'tarefa qq ',
            id_usuario: 1,
          },
          {
            id_tarefa: 5,
            nome_tarefa: 'Tarefa massinha',
            dt_inicial: new Date(),
            dt_final: addDays(new Date(), 29),
            hora: 12,
            stts_tarefa: 0,
            descricao: 'tarefa qq ',
            id_usuario: 1,
          },
        ],
      }),
    )
  }),
]
