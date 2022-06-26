export interface Tarefa {
  id_tarefa: number
  nome_tarefa: string
  data_inicial: Date
  data_limite: Date
  hora: number
  status: boolean
  descricao: string
  subtarefas?: any[]
}
